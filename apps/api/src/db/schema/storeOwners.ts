import { numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { boolean } from "drizzle-orm/pg-core";




export const storeOwners = pgTable("store_owners", {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    address: text("address").notNull(),
    cuisineType: text("cuisine_type").notNull(),
    isOpen: boolean("is_open").default(true).notNull(),
    rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type StoreOwner = typeof storeOwners.$inferSelect;
export type NewStoreOwner = typeof storeOwners.$inferInsert;