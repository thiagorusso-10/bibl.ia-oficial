import { db } from "../db";
import { users, purchases, products } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
    console.log("🔍 Debugging Access Control...\n");

    // 1. List Users
    const allUsers = await db.select().from(users);
    console.log(`Found ${allUsers.length} users:`);
    allUsers.forEach((u) => {
        console.log(`- [${u.id}] ${u.email} (Clerk: ${u.clerkId})`);
    });
    console.log("");

    // 2. List Purchases
    const allPurchases = await db
        .select({
            id: purchases.id,
            userEmail: users.email,
            productTitle: products.title,
            status: purchases.status,
            collectionSlugs: products.collectionSlugs,
        })
        .from(purchases)
        .leftJoin(users, eq(purchases.userId, users.id))
        .leftJoin(products, eq(purchases.productId, products.id));

    console.log(`Found ${allPurchases.length} purchases:`);
    allPurchases.forEach((p) => {
        console.log(
            `- User: ${p.userEmail} | Product: ${p.productTitle} | Status: ${p.status} | Unlocks: ${p.collectionSlugs}`
        );
    });
    console.log("");

    // 3. Check Products
    const allProducts = await db.select().from(products);
    console.log(`Found ${allProducts.length} products (check slugs):`);
    allProducts.forEach((p) => {
        console.log(`- ${p.title} (Slug: ${p.slug}, Collections: ${p.collectionSlugs})`);
    });

    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
