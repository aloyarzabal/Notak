import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/appError";

// const devResponse = (res: Response, statusCode: number, status: string, err: AppError) =>{
//   res.status(statusCode).json({
//     status: status,
//     message: err.message,
//     stack: err.stack,
//   });
// }

// const prodResponse = (res: Response, statusCode: number, status: string, err: AppError) =>{
//   res.status(statusCode).json({
//     status: status,
//     message: err.message,
//   });
// }

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    res.status(statusCode).json({
      status: status,
      message: err.message,
    });
  }
};
