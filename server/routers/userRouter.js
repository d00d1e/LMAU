import express from "express";
import { seedUsers, userProfile } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUsers);
userRouter.get("/:id", isAuth, userProfile);

export default userRouter;
