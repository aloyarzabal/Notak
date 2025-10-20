import { integer, pgTable, varchar, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), //Manual insertion or updates to this column are not allowed
  name: varchar({ length: 255 }).notNull(),
  photo: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().notNull().default(0),
  // activeDeclensions
  // avgScore
  role: varchar({ enum: ["admin", "user"] }).default("user"),
  password: varchar({ length: 255 }).notNull(),
  passwordConfirm: varchar({ length: 255 }),
  passwordChangedAt: date(),
  passwordResetToken: varchar({ length: 255 }),
  passwordResetTokenExpires: date(),
  active: boolean().default(true),
});

const password = z
  .string()
  .min(8, "Password needs to have minimum 8 characters")
  .regex(/[A-Z]/, "Password needs to contain at least one capital letter")
  .regex(/[a-z]/, "Password needs to contain at least one lower case")
  .regex(/[0-9]/, "Password needs to contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password needs to contain at least one special character"
  );

export const insertUserSchema = createInsertSchema(users, {
  email: z.email(),
  password,
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords are not the same.",
});

export const selectUserSchema = createSelectSchema(users);
