import { boolean } from "drizzle-orm/pg-core";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["ADMIN", "USER", "DRIVER"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    phoneNumber: text("phone_number").notNull(),
    role: userRoleEnum("role").notNull().default("USER"),
    pushToken: text("push_token"),
    isOnline: boolean("is_online").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

