import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = process.env.JWT_SECRET;

// @route     POST /user/signin
// @desc      Signin user & get token
// @access    public
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Account doesn't exist with this email." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @route     POST /user/signup
// @desc      Signup user & get token
// @access    public
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
