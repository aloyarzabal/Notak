/// <reference path="../types/express.d.ts" />

import express, { NextFunction, Request, Response } from "express";
import { wordRouter } from "./routes/wordRouter";
import { declensionsRouter } from "./routes/declensionRouter";
import { conjugationRouter } from "./routes/conjugationRouter";
import { errorHandler } from "./controllers/errorController";
import { AppError } from "./utils/appError";
import { userRouter } from "./routes/userRouter";

export const app = express();

app.use(express.json());

app.use("/words", wordRouter);
app.use("/declensions", declensionsRouter);
app.use("/conjugations", conjugationRouter);
app.use("/users", userRouter);

// Bug: https://github.com/expressjs/express/issues/5936

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(errorHandler);
