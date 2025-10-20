import { NextFunction, Request, Response } from "express";
import {
  addDeclension,
  getAllDeclensions,
  getDeclensionById,
  deleteDeclensionById,
  getDeclensionsByWordId,
  updateDeclensionById,
} from "../../db/queries/declensions";
import { validate } from "uuid";
import { AppError } from "../utils/appError";

//            /declensions
export const createDeclension = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { odmiana, number, form, wordId } = req.body;

  if (odmiana && number && form && wordId) {
    const newDeclension = await addDeclension(wordId, odmiana, number, form);

    if (newDeclension) {
      res.status(200).json({
        status: "success",
        message: "Declension created",
        data: newDeclension,
      });
    } else {
      next(new AppError("Interal error", 500));
    }
  } else {
    next(new AppError("Info is missing", 400));
  }
};

//            /declensions
export const getDeclensions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allDeclensions = await getAllDeclensions();

  res.status(200).json({
    status: "success",
    results: allDeclensions.length,
    data: allDeclensions,
  });
};

//            /declensions/:id
export const getDeclension = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const declensionId = req.params.id;

  if (declensionId) {
    const found = await getDeclensionById(declensionId);

    if (found) {
      res.status(200).json({
        status: "success",
        message: "Declension found",
        data: found,
      });
    } else {
      next(new AppError("Declension not found", 404));
    }
  } else {
    next(new AppError("Invalid ID format", 400));
  }
};

//            /declensions/word/:id
export const getDeclensionsOfAWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wordId = req.params.id;

  if (!wordId) {
    next(new AppError("You need a word ID", 400));
  }

  if (validate(wordId)) {
    // const existInDatabase = await getWordById(wordId)
    const declensions = await getDeclensionsByWordId(wordId);

    if (declensions) {
      res.status(200).json({
        status: "success",
        results: declensions.length,
        data: declensions,
      });
    } else {
      next(new AppError("Not found", 404));
    }
  } else {
    next(new AppError("Invalid ID format", 400));
  }
};

//            /declensions/:id
export const deleteDeclension = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const declensionId = req.params.id;

  if (declensionId) {
    const deleted = await deleteDeclensionById(declensionId);

    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Declension deleted succesfully",
        data: deleted,
      });
    } else {
      next(new AppError("Not found", 404));
    }
  } else {
    next(new AppError("Invalid ID format", 400));
  }
};

//            /declensions/:id
export const updateDeclension = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const declensionId = req.params.id;
  const newInfo = req.body;

  if (!declensionId) {
    next(new AppError("You need a declension ID", 400));
  }

  if (validate(declensionId)) {
    const updated = await updateDeclensionById(declensionId, newInfo);

    if (updated) {
      res.status(200).json({
        status: "success",
        data: updated,
      });
    } else {
      next(new AppError("Not found", 404));
    }
  } else {
    next(new AppError("Invalid ID format", 400));
  }
};
