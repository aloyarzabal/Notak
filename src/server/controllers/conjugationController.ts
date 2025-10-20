import { NextFunction, Request, Response } from "express";
import {
  addConjugation,
  getAllConjugations,
  getConjugationsByWordId,
  getConjugationById,
  updateConjugationById,
  deleteConjugationById,
  deleteConjugationsByWordId,
} from "../../db/queries/conjugations";

export const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  console.log(`The ID is ${val}`);
  next();
};

//            /conjugations
export const createConjugation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { wordId, person, tense, aspect, form } = req.body;

  if (wordId && person && tense && form && aspect) {
    const newConjugation = await addConjugation(
      wordId,
      person,
      tense,
      aspect,
      form
    );

    if (newConjugation) {
      res.status(200).json({
        status: "success",
        message: "Conjugation created",
        data: newConjugation,
      });
    } else {
      res.status(500).json({ status: "fail", message: "Internal error" });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "Info is missing",
    });
  }
};

//            /conjugations
export const getConjugations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allConjugations = await getAllConjugations();

  if (allConjugations) {
    res.status(200).json({
      status: "success",
      message: "All conjugations",
      data: allConjugations,
    });
  } else {
    res.status(500).json({ status: "fail", message: "Internal error" });
  }
};

//            /conjugations/:id
export const getConjugation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const conjugation = await getConjugationById(id);

  if (conjugation) {
    res.status(200).json({
      status: "success",
      message: "Conjugation found",
      data: conjugation,
    });
  }
};

//            /conjugations/word/:id
export const getConjugationOfAWord = async (req: Request, res: Response) => {
  const wordId = req.params.id;

  const conjugation = await getConjugationsByWordId(wordId);
  if (conjugation) {
    res.status(200).json({
      status: "success",
      message: "Conjugation found",
      data: conjugation,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Conjugation not found",
    });
  }
};

//            /conjugations/:id
export const updateConjugation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newInfo = req.body;

  const update = await updateConjugationById(id, newInfo);
};

//            /conjugations/:id
export const deleteConjugation = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await deleteConjugationById(id);

  if (deleted) {
    res.status(200).json({
      status: "Success",
      message: "Conjugation deleted",
      data: deleted,
    });
  }
};

//            /conjugations/word/:id
export const deleteConjugationOfAWord = async (req: Request, res: Response) => {
  const wordId = req.params.id;

  const deleted = await deleteConjugationsByWordId(wordId);

  if (deleted) {
    res.status(200).json({
      status: "Success",
      message: "Conjugation deleted",
      data: deleted,
    });
  }
};
