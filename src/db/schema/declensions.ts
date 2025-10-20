import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { words } from "./words";

export const declensions = pgTable("declensions", {
  id: uuid("id").primaryKey().defaultRandom(),
  wordId: uuid("word_id")
    .notNull()
    .references(() => words.id),
  odmiana: text("case").notNull(), // Ej: 'mianownik'
  number: text("number").notNull(), // 'singular' o 'plural'
  form: text("form").notNull(),
});
