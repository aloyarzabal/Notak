import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { conjugations } from "../schema/conjugations";
import { and, eq, InferInsertModel } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);
type NewConjugation = InferInsertModel<typeof conjugations>;
type ConjugationUpdate = Partial<InferInsertModel<typeof conjugations>>;

// Creates an new conjugation
export const addConjugation = (
  wordId: string,
  person: string,
  tense: string,
  aspect: string,
  form: string
) => {
  const newConjugation: NewConjugation = {
    wordId,
    person,
    tense,
    aspect,
    form,
  };

  const inserted = db.insert(conjugations).values(newConjugation).returning();
  console.log("Conj: Inserted: ", inserted);
  return inserted;
};

//Gets one particular conjugation
export const getConjugationById = (cojugationId: string) => {
  const found = db
    .select()
    .from(conjugations)
    .where(eq(conjugations.id, cojugationId));

  return found;
};

//Gets ALL conjugations from a WORD
export const getConjugationsByWordId = (wordId: string) => {
  const found = db
    .select()
    .from(conjugations)
    .where(eq(conjugations.wordId, wordId));

  return found;
};

//Gets ALL conjugations
export const getAllConjugations = () => {
  const found = db.select().from(conjugations);
  return found;
};

//Updates a particular conjugation
export const updateConjugationById = (
  conjugationId: string,
  newForm: ConjugationUpdate
) => {
  const updated = db
    .update(conjugations)
    .set(newForm)
    .where(and(eq(conjugations.id, conjugationId)))
    .returning();

  return updated;
};

//Deletes a particular conjugation
export const deleteConjugationById = (conjugationId: string) => {
  const deleted = db
    .delete(conjugations)
    .where(eq(conjugations.id, conjugationId))
    .returning();

  return deleted;
};

//Deletes all conjugations of a word
export const deleteConjugationsByWordId = (wordId: string) => {
  const deleted = db
    .delete(conjugations)
    .where(eq(conjugations.wordId, wordId))
    .returning();

  return deleted;
};
