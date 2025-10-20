import express from "express";
import {
  createConjugation,
  deleteConjugation,
  getConjugation,
  getConjugations,
  updateConjugation,
  checkID,
} from "../controllers/conjugationController";
import { protect } from "../middleware/protect";

export const conjugationRouter = express.Router();

conjugationRouter.use(protect);

conjugationRouter.param("id", checkID);

conjugationRouter.route("/").get(getConjugations).post(createConjugation);
conjugationRouter
  .route("/:id")
  .get(getConjugation)
  .patch(updateConjugation)
  .delete(deleteConjugation);
