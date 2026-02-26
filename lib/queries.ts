import { db } from "@/db";
import { collections, contentItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCollections() {
    return db.select().from(collections);
}

export async function getCollectionBySlug(slug: string) {
    const results = await db
        .select()
        .from(collections)
        .where(eq(collections.slug, slug));
    return results[0] ?? null;
}

export async function getCourses() {
    return db
        .select()
        .from(collections)
        .where(eq(collections.type, "COURSE"));
}

export async function getKidsResources() {
    const [kidsBank] = await db
        .select()
        .from(collections)
        .where(eq(collections.slug, "fun-bible-kids"));

    if (!kidsBank) return [];

    return db
        .select()
        .from(contentItems)
        .where(eq(contentItems.collectionId, kidsBank.id));
}

export async function getContentByCollection(collectionId: string) {
    return db
        .select()
        .from(contentItems)
        .where(eq(contentItems.collectionId, collectionId));
}

export async function getEbooks() {
    const courses = await getCourses();
    const ebooks = [];
    for (const course of courses) {
        const items = await db
            .select()
            .from(contentItems)
            .where(eq(contentItems.collectionId, course.id));
        const pdfItem = items.find((i) => i.contentType === "PDF_FILE");
        if (pdfItem) {
            ebooks.push({
                ...course,
                fileUrl: pdfItem.fileUrl,
            });
        }
    }
    return ebooks;
}
