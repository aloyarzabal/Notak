import { words } from "../schema/words";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, InferInsertModel } from "drizzle-orm";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);

type NewWord = InferInsertModel<typeof words>;
type WordUpdate = Partial<InferInsertModel<typeof words>>;

// DATA ACCESS LAYER
export const addWord = async (
  baseForm: string,
  type: string,
  gender?: string
) => {
  const newWord: NewWord = {
    baseForm,
    type,
    gender,
  };
  const inserted = await db.insert(words).values(newWord).returning();

  return inserted[0];
};

export const getAllWords = async () => {
  const target = await db.select().from(words);

  return target;
};

export const getWordById = async (wordId: string) => {
  const target = await db.select().from(words).where(eq(words.id, wordId));
  return target[0];
};

export const updateWordById = async (wordId: string, newValues: WordUpdate) => {
  console.log("BD-updateWordByID: ", newValues);

  const updated = await db
    .update(words)
    .set(newValues)
    .where(eq(words.id, wordId))
    .returning();
  return updated[0];
};

export const deleteWordById = async (wordId: string) => {
  const deleted = await db
    .delete(words)
    .where(eq(words.id, wordId))
    .returning();
  return deleted[0];
};
