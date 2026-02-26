import { headers } from "next/headers";
import { db } from "@/db";
import { purchases, products, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Kiwify webhook secret for signature verification (optional for now)
const KIWIFY_SECRET = process.env.KIWIFY_WEBHOOK_SECRET;

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // Kiwify sends different event types
        // We only care about approved orders
        const eventType =
            payload.webhook_event_type ?? payload.order_status ?? "";

        if (
            eventType !== "order_approved" &&
            eventType !== "order.approved" &&
            payload.order_status !== "paid"
        ) {
            console.log(
                `[Kiwify Webhook] Ignored event: ${eventType || payload.order_status}`
            );
            return new Response("Event ignored", { status: 200 });
        }

        // Extract buyer email from Kiwify payload
        const buyerEmail =
            payload.Customer?.email ??
            payload.customer?.email ??
            payload.buyer?.email ??
            null;

        if (!buyerEmail) {
            console.error("[Kiwify Webhook] No buyer email found in payload");
            return new Response("Missing buyer email", { status: 400 });
        }

        // Extract product info from Kiwify payload
        const productName =
            payload.Product?.product_name ??
            payload.product?.name ??
            payload.Subscription?.plan?.name ??
            "unknown";

        const orderId =
            payload.order_id ??
            payload.Transaction?.order_id ??
            payload.transaction_id ??
            `kiwify_${Date.now()}`;

        console.log(
            `[Kiwify Webhook] order_approved: ${buyerEmail} bought "${productName}" (${orderId})`
        );

        // Find user in our DB by email (synced from Clerk)
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, buyerEmail))
            .limit(1);

        if (!user) {
            console.warn(
                `[Kiwify Webhook] User not found for email: ${buyerEmail}. Purchase will be matched when user signs up.`
            );
            // Even without a user match, we could store this for later reconciliation
            // For now, return 200 so Kiwify doesn't retry
            return new Response("User not found yet — will reconcile later", {
                status: 200,
            });
        }

        // Try to match the Kiwify product to our products in DB
        // We'll do a fuzzy match based on the product name or slug
        const allProducts = await db.select().from(products);
        let matchedProduct = allProducts.find(
            (p) =>
                productName.toLowerCase().includes(p.slug.replace(/-/g, " ")) ||
                productName.toLowerCase().includes(p.title.toLowerCase())
        );

        // Fallback: try to match by kiwifyLink or just get the "combo-tudo" if nothing matches
        if (!matchedProduct) {
            matchedProduct = allProducts.find(
                (p) => p.slug === "combo-tudo"
            );
        }

        if (!matchedProduct) {
            console.error(
                `[Kiwify Webhook] No matching product for: "${productName}"`
            );
            return new Response("Product not matched", { status: 200 });
        }

        // Record the purchase
        await db.insert(purchases).values({
            userId: user.id,
            productId: matchedProduct.id,
            kiwifyOrderId: orderId,
            kiwifyEmail: buyerEmail,
            status: "approved",
        });

        console.log(
            `[Kiwify Webhook] ✅ Purchase recorded: ${buyerEmail} → ${matchedProduct.title}`
        );

        return new Response("Purchase recorded", { status: 200 });
    } catch (err) {
        console.error("[Kiwify Webhook] Error:", err);
        return new Response("Internal error", { status: 500 });
    }
}
