import BoardModel from "../models/board.js";

// @route     POST /board/createBoard
// @desc      create a new board
// @access    private
export const createBoard = async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title missing" });

  try {
    const newBoard = await BoardModel.create({
      title,
      user_id: req.userId,
    });

    res.status(200).json({ newBoard });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @route     GET /board/getBoards
// @desc      get all boards
// @access    private
export const getBoards = async (req, res) => {
  try {
    const boards = await BoardModel.find({ user_id: req.userId }); // .skip(n).limit(n)

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
