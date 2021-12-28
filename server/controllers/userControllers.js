import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

// SEED USERS
export const seedUsers = expressAsyncHandler(async (req, res) => {
  // await User.remove({});
  const users = await User.insertMany(data.users);

  res.send({ users });
});

// GET USER
export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).send({ message: "User not found" });
  }

  res.send(user);
});
