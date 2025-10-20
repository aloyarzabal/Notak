import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { words } from "./words";

export const conjugations = pgTable("conjugations", {
  id: uuid("id").primaryKey().defaultRandom(),
  wordId: uuid("word_id")
    .notNull()
    .references(() => words.id),
  person: text("person").notNull(), // 1s, 2s, 3s, 1p, etc.
  tense: text("tense").notNull(), // presente, pasado, futuro
  aspect: text("aspect"), // perfectivo, imperfectivo
  form: text("form").notNull(), // ej. "idę", "poszedłem"
});
