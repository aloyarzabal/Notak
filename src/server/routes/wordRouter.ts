import express from "express";
import {
  createWord,
  getWords,
  getWord,
  deleteWord,
  updateWord,
} from "../controllers/wordController";
import { protect } from "../middleware/protect";
import { restricTo } from "../middleware/restrictTo";

export const wordRouter = express.Router();

wordRouter.use(protect);

// ALL WORDS
wordRouter.route("/").get(getWords).post(createWord);

// WORD BY ID
wordRouter.route("/:id").get(getWord).patch(updateWord).delete(deleteWord);
