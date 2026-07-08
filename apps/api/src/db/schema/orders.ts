import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { storeOwners } from "./storeOwners";
import { uuid } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { users } from "./user";
import { menuItems } from "./categories";

export const orderStatusEnum = pgEnum("order_status", ["PENDING", "CONFIRMED", 'PACKING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', "DELIVERED", "CANCELLED"]);

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull().references(() => storeOwners.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    driverId: uuid("driver_id").notNull().references(() => users.id),
    status: orderStatusEnum("status").default("PENDING").notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    paymentStatus: text("payment_status").notNull(),
    deliveryAddress: text("delivery_address").notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
    deliveryTime: timestamp("delivery_time").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    menuItemId: uuid("menu_item_id").notNull().references(() => menuItems.id, { onDelete: "cascade" }),
    quantity: numeric("quantity").notNull(),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;