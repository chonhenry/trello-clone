import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

export const signin = (req, res) => {
  res.json({ msg: "signin route" });
};

export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    res.json({ msg: "signup route", email, name, password });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
