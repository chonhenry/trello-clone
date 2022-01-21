import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "jwtsecret";

export const signin = (req, res) => {
  const { email, password } = req.body;
};

export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "There is already an account associated with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      boards: [],
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
