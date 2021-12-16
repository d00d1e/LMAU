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

// AUTHORIZED USERS ONLY
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);

    jwt.verify(token, process.env.JWT_SECRET || "secret", (error, decode) => {
      if (error) {
        res.status(401).send({ message: "Invalid token" });
      }

      res.user = decode;
      next();
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
