import express from "express";
import {
  getDeclensions,
  createDeclension,
  getDeclension,
  updateDeclension,
  deleteDeclension,
  getDeclensionsOfAWord,
} from "../controllers/declensionController";
import { protect } from "../middleware/protect";

export const declensionsRouter = express.Router();

declensionsRouter.use(protect);

declensionsRouter.route("/").get(getDeclensions).post(createDeclension);
declensionsRouter
  .route("/:id")
  .get(getDeclension)
  .patch(updateDeclension)
  .delete(deleteDeclension);

declensionsRouter.route("/word/:id").get(getDeclensionsOfAWord);
