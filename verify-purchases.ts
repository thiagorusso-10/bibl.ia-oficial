import { db } from "./db";
import { purchases, products, users } from "./db/schema";
import { eq } from "drizzle-orm";

async function run() {
    console.log("Fetching purchases from DB...");
    try {
        const allPurchases = await db
            .select({
                userEmail: users.email,
                productTitle: products.title,
                collectionSlugs: products.collectionSlugs,
            })
            .from(purchases)
            .innerJoin(users, eq(purchases.userId, users.id))
            .innerJoin(products, eq(purchases.productId, products.id));

        console.log("Purchases:", JSON.stringify(allPurchases, null, 2));
    } catch (error) {
        console.error("DB Error:", error);
    }
    process.exit(0);
}

run();
