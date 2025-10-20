import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export type Word = {
  id: number;
  baseForm: string;
  type: string;
  gender: string;
  createdAt: string;
};

export const words = pgTable("words", {
  id: uuid("id").primaryKey().defaultRandom(),
  baseForm: text("base_form").notNull().unique(),
  type: text("type").notNull(), // 'noun', 'verb', etc.
  gender: text("gender"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wordsInsertSchema = createInsertSchema(words, {
  baseForm: (schema) => schema.max(100),
});
