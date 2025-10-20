import { declensions } from "../schema/declensions";
import "dotenv/config";
import { eq, and, InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);
type NewDeclension = InferInsertModel<typeof declensions>;
type DeclensionUpdate = Partial<InferInsertModel<typeof declensions>>;

//Creates a new declension
export const addDeclension = (
  wordId: string,
  odmiana: string,
  number: string,
  form: string
) => {
  const newDeclension: NewDeclension = {
    wordId,
    odmiana,
    number,
    form,
  };
  const inserted = db.insert(declensions).values(newDeclension).returning();
  return inserted;
};

export const getAllDeclensions = () => {
  const allDeclensions = db.select().from(declensions);
  return allDeclensions;
};

//Return all declensions of a word
export const getDeclensionsByWordId = (wordId: string) => {
  const found = db
    .select()
    .from(declensions)
    .where(eq(declensions.wordId, wordId));

  return found;
};

// Return a particular declension
export const getDeclensionById = (declensionId: string) => {
  const found = db
    .select()
    .from(declensions)
    .where(and(eq(declensions.id, declensionId)));

  return found;
};

//Updates a particular declension
export const updateDeclension = (
  wordId: string,
  odmiana: string,
  number: string,
  form: string
) => {
  const updated = db
    .update(declensions)
    .set({ form })
    .where(
      and(
        eq(declensions.wordId, wordId),
        eq(declensions.number, number),
        eq(declensions.odmiana, odmiana)
      )
    )
    .returning();

  return updated;
};

//Updates a particular declension by its ID
export const updateDeclensionById = (
  declensionId: string,
  newValues: DeclensionUpdate
) => {
  const updated = db
    .update(declensions)
    .set(newValues)
    .where(and(eq(declensions.id, declensionId)))
    .returning();

  return updated;
};

// Deletes all declensions from a word
export const deleteDeclensionsByWordId = (wordId: string) => {
  const deleted = db
    .delete(declensions)
    .where(eq(declensions.wordId, wordId))
    .returning();

  return deleted;
};

export const deleteDeclensionById = (declensionId: string) => {
  const deleted = db
    .delete(declensions)
    .where(eq(declensions.id, declensionId))
    .returning();
  return deleted;
};
