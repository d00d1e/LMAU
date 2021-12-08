import express from "express";
import { seedUsers } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUsers);

export default userRouter;
