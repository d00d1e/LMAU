import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

// SEED USERS
export const seedUsers = expressAsyncHandler(async (req, res) => {
  // await User.remove({});
  const users = await User.insertMany(data.users);

  res.send({ users });
});
