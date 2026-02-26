import { db } from "@/db";
import { userProgress, contentItems, collections } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

/**
 * Get all progress records for a user.
 */
export async function getUserProgress(userId: string) {
    return db
        .select()
        .from(userProgress)
        .where(eq(userProgress.userId, userId));
}

/**
 * Get set of completed content item IDs for a user.
 */
export async function getCompletedItemIds(userId: string): Promise<Set<string>> {
    const progress = await db
        .select({ contentItemId: userProgress.contentItemId })
        .from(userProgress)
        .where(
            and(
                eq(userProgress.userId, userId),
                eq(userProgress.isCompleted, true)
            )
        );
    return new Set(progress.map((p) => p.contentItemId));
}

/**
 * Get total completed items count for a user.
 */
export async function getCompletedCount(userId: string): Promise<number> {
    const [result] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(userProgress)
        .where(
            and(
                eq(userProgress.userId, userId),
                eq(userProgress.isCompleted, true)
            )
        );
    return result?.count ?? 0;
}

/**
 * Get completed collection slugs for a user.
 * A collection is "completed" if the user has completed at least one
 * content item from that collection.
 */
export async function getCompletedCollectionSlugs(
    userId: string
): Promise<Set<string>> {
    const completed = await db
        .select({ slug: collections.slug })
        .from(userProgress)
        .innerJoin(
            contentItems,
            eq(userProgress.contentItemId, contentItems.id)
        )
        .innerJoin(
            collections,
            eq(contentItems.collectionId, collections.id)
        )
        .where(
            and(
                eq(userProgress.userId, userId),
                eq(userProgress.isCompleted, true)
            )
        )
        .groupBy(collections.slug);

    return new Set(completed.map((c) => c.slug));
}

/**
 * Toggle progress for a content item.
 * If already completed, mark as not completed. If not, mark as completed.
 */
export async function toggleProgress(
    userId: string,
    contentItemId: string
): Promise<boolean> {
    // Check if there's an existing record
    const [existing] = await db
        .select()
        .from(userProgress)
        .where(
            and(
                eq(userProgress.userId, userId),
                eq(userProgress.contentItemId, contentItemId)
            )
        )
        .limit(1);

    if (existing) {
        // Toggle
        const newValue = !existing.isCompleted;
        await db
            .update(userProgress)
            .set({
                isCompleted: newValue,
                lastAccessed: new Date(),
            })
            .where(eq(userProgress.id, existing.id));
        return newValue;
    } else {
        // Create new record as completed
        await db.insert(userProgress).values({
            userId,
            contentItemId,
            isCompleted: true,
        });
        return true;
    }
}

/**
 * Get first content item ID for each collection slug.
 * Used to track "collection-level" progress via content items.
 */
export async function getCollectionFirstItemMap(): Promise<
    Record<string, string>
> {
    const items = await db
        .select({
            slug: collections.slug,
            itemId: contentItems.id,
        })
        .from(contentItems)
        .innerJoin(
            collections,
            eq(contentItems.collectionId, collections.id)
        )
        .orderBy(contentItems.orderIndex);

    // Keep only the first item per collection
    const map: Record<string, string> = {};
    for (const item of items) {
        if (!map[item.slug]) {
            map[item.slug] = item.itemId;
        }
    }
    return map;
}
