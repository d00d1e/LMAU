import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import { generateToken } from "../middlewares/middleware.js";
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

// UPDATE USER PROFILE
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  }
});
