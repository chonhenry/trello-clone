import BoardModel from "../models/board.js";

export const createBoard = async (req, res) => {
  res.json({
    message: "create board",
    title: req.body.title,
    userId: req.userId,
  });
};
