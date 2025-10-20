import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import {
  addUser,
  correctPassword,
  getUserByEmail,
  updateUserPassword,
  User,
} from "../../db/queries/users";

export const createSendToken = (
  user: User,
  statusCode: number,
  res: Response
) => {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" && true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Read info from the body
    const { name, email, password, passwordConfirm } = req.body;

    if (name && email && password && passwordConfirm) {
      const newUser: User = await addUser(
        name,
        email,
        password,
        passwordConfirm
      );

      if (!newUser) {
        next(new AppError("User could not be created", 500));
      }
      createSendToken(newUser, 200, res);
    } else {
      next(new AppError("Info is missing", 400));
    }
  }
);

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      next(new AppError("Please provide email and password", 400));
    }

    //Check if the user exists and the password is correct
    const user = await getUserByEmail(email);

    if (!user || !(await correctPassword(password, user.password))) {
      next(new AppError("User not found or password not correct", 404));
    } else {
      //If everything is correct, send token
      createSendToken(user, 200, res);
    }
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return next(new AppError("Please introduce your password", 400));
    }

    if (!req.user || !correctPassword(password, req.user?.password)) {
      return next(new AppError("Password is not correct", 401));
    }

    //TODO update del user
    updateUserPassword(req.user.email, newPassword);
  }
);
