import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/appError";

export const restricTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("user:", req.user?.name, " ", req.user?.role);
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You don't have permissions for that", 403));
    }
    next();
  };
};
