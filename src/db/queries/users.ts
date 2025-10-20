import { drizzle } from "drizzle-orm/node-postgres";
import { insertUserSchema, selectUserSchema, users } from "../schema/users";
import "dotenv/config";
import { eq, InferInsertModel } from "drizzle-orm";
import bcrypt from "bcrypt";

const db = drizzle(process.env.DATABASE_URL!);
export type User = InferInsertModel<typeof users>;

export const addUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  // parses the data and checks it
  const parsedData = insertUserSchema.parse({
    name,
    email,
    password,
    passwordConfirm,
  });

  // hashes the password before being stored in the DB
  parsedData.password = await bcrypt.hash(parsedData.password, 12);
  parsedData.passwordConfirm = undefined;

  const inserted = await db.insert(users).values(parsedData).returning();

  return inserted[0];
};

export const updateUserPassword = async (user: User, password: string) => {};

export const getAllUsers = async () => {
  const target = await db.select().from(users);
  // return selectUserSchema.parse(target);
  return target;
};

export const getUserById = async (userId: string) => {
  //TODO cambiar a string en la BD
  const temporaryChangeToInteger = +userId;

  const target = await db
    .select()
    .from(users)
    .where(eq(users.id, temporaryChangeToInteger));
  return target;
};

export const getUserByEmail = async (email: string) => {
  const found = await db.select().from(users).where(eq(users.email, email));
  return found[0];
  // return selectUserSchema.parse(user ? user[0] : undefined);
};

export const deleteUserById = async (userId: string) => {
  //TODO cambiar a string en la BD
  const temporaryChangeToInteger = +userId;

  const deleted = await db
    .delete(users)
    .where(eq(users.id, temporaryChangeToInteger))
    .returning();

  return deleted;
};

export const correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// getOneUser
// udateUser
