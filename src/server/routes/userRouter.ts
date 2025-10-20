import express from "express";
import { deleteUser, getUser, getUsers } from "../controllers/userController";
import { signUp, logIn, updatePassword } from "../controllers/authController";
import { protect } from "../middleware/protect";
import { restricTo } from "../middleware/restrictTo";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.patch("/updatePassword", protect, updatePassword);

// ALL USERS
userRouter.route("/").get(protect, restricTo("admin"), getUsers);

// USERS BY ID
userRouter
  .route("/:id")
  .delete(protect, restricTo("admin"), deleteUser)
  .get(protect, restricTo("admin"), getUser);
