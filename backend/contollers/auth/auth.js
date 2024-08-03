import User from "../../models/user/user.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/errors.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();
    res.json({ message: "Successful" });
  } catch (error) {
    next(error);
  }
};
