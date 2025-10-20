import { NextFunction, Request, Response } from "express";
import {
  addWord,
  deleteWordById,
  getAllWords,
  getWordById,
  updateWordById,
} from "../../db/queries/words";
import { validate } from "uuid";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

//            /words/
export const createWord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { baseForm, type, gender } = req.body;

    if (baseForm && type && gender) {
      const newWord = await addWord(baseForm, type, gender);

      if (newWord) {
        res.status(201).json({
          status: "success",
          data: {
            newWord,
          },
        });
      } else {
        next(new AppError("Word could not be created", 500));
      }
    } else {
      next(new AppError("Info is missing", 400));
    }
  }
);

//            /words/
export const getWords = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const words = await getAllWords();

    res.status(200).json({
      status: "success",
      results: words.length,
      data: {
        words,
      },
    });
  }
);

//            /words/:id
export const getWord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const wordId = req.params.id;

    if (validate(wordId)) {
      const word = await getWordById(wordId);

      if (!word) {
        next(new AppError("Word not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          word,
        },
      });
    } else {
      next(new AppError("Invalid ID format", 400));
    }
  }
);

//            /words/:id
export const deleteWord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const wordId = req.params.id;

    if (validate(wordId)) {
      const deletedWord = await deleteWordById(wordId);

      if (!deletedWord) {
        next(new AppError("Word not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          deletedWord,
        },
      });
    } else {
      next(new AppError("Invalid ID format", 400));
    }
  }
);

//            /words/:id
export const updateWord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const wordId = req.params.id;
    const newInfo = req.body;

    if (validate(wordId)) {
      const updatedWord = await updateWordById(wordId, newInfo);

      if (!updatedWord) {
        next(new AppError("Word not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          updatedWord,
        },
      });
    } else {
      next(new AppError("Invalid ID format", 400));
    }
  }
);
