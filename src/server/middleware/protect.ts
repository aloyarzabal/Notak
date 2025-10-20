import { Request, Response, NextFunction } from "express";
import { User, getUserByEmail } from "../../db/queries/users";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import jwt from "jsonwebtoken";

const verifyToken = (
  token: string,
  secret: string
): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      } else {
        return resolve(decoded as jwt.JwtPayload);
      }
    });
  });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("You are not logged in, please log in.", 401));
    }

    // 2) Verify the token
    const decoded = await verifyToken(token, process.env.JWT_SECRET!);

    // 3) Check if user still exists
    const currentUser: User = await getUserByEmail(decoded.email);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // TODO 4) Check if user changed password after the token was issued

    // 5) If everything it's correct, add user to req
    req.user = currentUser;
    console.log(
      "User loaded in the req: ",
      currentUser.name,
      " with role: ",
      currentUser.role
    );

    next();
  }
);
