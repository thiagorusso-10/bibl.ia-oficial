import {
    pgTable,
    uuid,
    text,
    varchar,
    pgEnum,
    integer,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const collectionTypeEnum = pgEnum("collection_type", [
    "COURSE",
    "RESOURCE_BANK",
]);

export const contentTypeEnum = pgEnum("content_type", [
    "TEXT_CHAPTER",
    "PDF_FILE",
    "SLIDE_STORY",
]);

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

// Users — synced with Clerk
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    role: userRoleEnum("role").default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Collections — "Teologia Sistemática", "Fun Bible Kids"
export const collections = pgTable("collections", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    imageUrl: varchar("image_url", { length: 500 }),
    type: collectionTypeEnum("type").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Content Items — chapters or downloadable resources
export const contentItems = pgTable("content_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    collectionId: uuid("collection_id")
        .notNull()
        .references(() => collections.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 500 }).notNull(),
    orderIndex: integer("order_index").default(0).notNull(),
    contentType: contentTypeEnum("content_type").notNull(),
    textContent: text("text_content"),
    fileUrl: varchar("file_url", { length: 500 }),
    categoryTag: varchar("category_tag", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User Progress — tracks reading/download progress
export const userProgress = pgTable("user_progress", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    contentItemId: uuid("content_item_id")
        .notNull()
        .references(() => contentItems.id, { onDelete: "cascade" }),
    isCompleted: boolean("is_completed").default(false).notNull(),
    lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
});

// Products — items available for purchase on Kiwify
export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    priceInCents: integer("price_in_cents").notNull(),
    kiwifyLink: varchar("kiwify_link", { length: 500 }),
    // A product can unlock one or more collections
    collectionSlugs: text("collection_slugs"), // comma-separated slugs
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Purchases — records of completed purchases
export const purchases = pgTable("purchases", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    kiwifyOrderId: varchar("kiwify_order_id", { length: 255 }),
    kiwifyEmail: varchar("kiwify_email", { length: 255 }),
    status: varchar("status", { length: 50 }).default("approved").notNull(),
    purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

