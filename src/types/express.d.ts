import { JwtPayload } from "jsonwebtoken";
import { User } from "../db/queries/users";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | User;
    }
  }
}
