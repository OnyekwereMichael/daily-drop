import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { storeOwners } from "./storeOwners";
import { users } from "./user";
import { numeric } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { integer } from "drizzle-orm/pg-core";

export const reviews = pgTable("reviews", {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull().references(() => storeOwners.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    orderId: uuid("order_id").notNull().references(() => orders.id),
    driverId: uuid("driver_id").notNull().references(() => users.id),
    ownerRating: integer("owner_rating").notNull(),
    driverRating: integer("driver_rating"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;