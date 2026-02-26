import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!SIGNING_SECRET) {
        console.error("Missing CLERK_WEBHOOK_SECRET env variable");
        return new Response("Server configuration error", { status: 500 });
    }

    // Verify webhook signature
    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let event: WebhookEvent;

    try {
        event = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new Response("Invalid signature", { status: 400 });
    }

    // Handle events
    switch (event.type) {
        case "user.created":
        case "user.updated": {
            const { id, email_addresses, first_name, last_name } = event.data;
            const primaryEmail =
                email_addresses?.[0]?.email_address ?? "unknown@example.com";
            const fullName = [first_name, last_name]
                .filter(Boolean)
                .join(" ")
                .trim();

            await db
                .insert(users)
                .values({
                    clerkId: id,
                    email: primaryEmail,
                    name: fullName || null,
                })
                .onConflictDoUpdate({
                    target: users.clerkId,
                    set: {
                        email: primaryEmail,
                        name: fullName || null,
                        updatedAt: new Date(),
                    },
                });

            console.log(
                `[Clerk Webhook] User ${event.type}: ${primaryEmail} (${id})`
            );
            break;
        }

        case "user.deleted": {
            const { id } = event.data;
            if (id) {
                await db.delete(users).where(eq(users.clerkId, id));
                console.log(`[Clerk Webhook] User deleted: ${id}`);
            }
            break;
        }

        default:
            console.log(`[Clerk Webhook] Unhandled event: ${event.type}`);
    }

    return new Response("OK", { status: 200 });
}
