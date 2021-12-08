import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../middlewares/middleware.js";

// LOGIN
export const loginUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const validated = bcrypt.compareSync(req.body.password, user.password);

  if (user && validated) {
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  }

  res.status(401).send({ message: "Invalid email or password" });
});

// REGISTER
export const registerUser = expressAsyncHandler(async (req, res) => {
  // TODO: register user
});
