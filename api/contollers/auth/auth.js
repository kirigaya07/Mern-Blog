import User from "../../models/user/user.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // Fixed: was missing `return`, execution continued to bcrypt.hashSync(undefined)
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "No account found with that email"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect password"));
    }

    // Fixed: added expiresIn — tokens were previously valid forever
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    // Fixed: was empty catch block — all signin errors were silently swallowed
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Fixed: added expiresIn
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      // Fixed: was not awaited — token was signed for a potentially unsaved document
      await newUser.save();

      // Fixed: added expiresIn
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
