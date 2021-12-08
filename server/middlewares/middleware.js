import jwt from "jsonwebtoken";

// GENERATE TOKEN
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "30d" }
  );
};
