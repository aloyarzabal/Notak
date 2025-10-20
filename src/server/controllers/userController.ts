import { NextFunction, Request, Response } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../../db/queries/users";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await getAllUsers();

    if (!allUsers) {
      next(new AppError("Users not found.", 404));
    }
    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: {
        allUsers,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      next(new AppError("Provide the Id of the user to delete", 400));
    } else {
      const deletedUser = await deleteUserById(id);

      if (!deletedUser) {
        next(new AppError("User could not be deleted", 500));
      }

      res.status(200).json({
        status: "success",
        data: {
          deletedUser,
        },
      });
    }
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      next(new AppError("Provide the Id of the user", 400));
    } else {
      const found = await getUserById(id);

      if (!found) {
        next(new AppError("User could not be found", 500));
      }

      res.status(200).json({
        status: "success",
        data: {
          found,
        },
      });
    }
  }
);
