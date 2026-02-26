import { db } from "@/db";
import { purchases, products, users } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

/**
 * Get the internal user ID from the Clerk session.
 * Returns null if user is not found in DB yet.
 */
export async function getCurrentUser() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.clerkId, clerkId))
            .limit(1);

        return user ?? null;
    } catch (error) {
        // Silently fails and falls back to unauthenticated features if DB is disconnected
        return null;
    }
}

/**
 * Check if a user has purchased a product that unlocks
 * a specific collection slug.
 */
export async function hasAccessToCollection(
    userId: string,
    collectionSlug: string
): Promise<boolean> {
    // Get all user purchases with product details
    const userPurchases = await db
        .select({
            collectionSlugs: products.collectionSlugs,
        })
        .from(purchases)
        .innerJoin(products, eq(purchases.productId, products.id))
        .where(
            and(
                eq(purchases.userId, userId),
                eq(purchases.status, "approved")
            )
        );

    // Check if any purchased product unlocks this collection
    return userPurchases.some((p) => {
        if (!p.collectionSlugs) return false;
        const slugs = p.collectionSlugs.split(",").map((s) => s.trim());
        return slugs.some(
            (s) =>
                s === collectionSlug || s.startsWith(`${collectionSlug}:`)
        );
    });
}

/**
 * Get all collection slugs the user has access to.
 */
export async function getUserAccessibleSlugs(
    userId: string
): Promise<string[]> {
    const userPurchases = await db
        .select({
            collectionSlugs: products.collectionSlugs,
        })
        .from(purchases)
        .innerJoin(products, eq(purchases.productId, products.id))
        .where(
            and(
                eq(purchases.userId, userId),
                eq(purchases.status, "approved")
            )
        );

    const slugs = new Set<string>();
    for (const p of userPurchases) {
        if (p.collectionSlugs) {
            p.collectionSlugs
                .split(",")
                .map((s) => s.trim())
                .forEach((s) => slugs.add(s));
        }
    }
    return [...slugs];
}

/**
 * Get all active products for the pricing page.
 */
export async function getActiveProducts() {
    return db
        .select()
        .from(products)
        .where(eq(products.isActive, true))
        .orderBy(products.priceInCents);
}
