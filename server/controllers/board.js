import mongoose from "mongoose";
import BoardModel from "../models/board.js";
import CardModel from "../models/card.js";

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

// @route     GET /board/createCard
// @desc      create a single card
// @access    private
export const createCard = async (req, res) => {
  const { board_id, column_id, title } = req.body;
  const user_id = req.userId;

  if (!title || !board_id || !column_id)
    return res.status(400).json({ message: "Information missing" });

  try {
    const board = await BoardModel.findById(mongoose.Types.ObjectId(board_id));

    if (user_id !== board.user_id.toString()) {
      return res
        .status(401)
        .json({ msg: "User IDs don;'t match, authorization denied" });
    }

    const newCard = await CardModel.create({
      title,
      user_id: req.userId,
      board_id,
      column_id,
    });

    const cardIndex = board.columns.findIndex(
      (column) => column._id === column_id
    );

    board.columns[cardIndex].cards.push(newCard);

    board.save();

    res.status(200).json({ card_id: newCard._id });
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
    const boards = await BoardModel.find({
      user_id: mongoose.Types.ObjectId(req.userId),
    }).sort({
      updatedAt: -1,
    }); // .skip(n).limit(n)

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @route     GET /board/getBoard/:boardId
// @desc      get a single board
// @access    private
export const getBoard = async (req, res) => {
  try {
    const board = await BoardModel.findById(
      mongoose.Types.ObjectId(req.params.boardId)
    );
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @route     PUT /board/addColumn
// @desc      add a new column
// @access    private
export const addColumn = async (req, res) => {
  try {
    const { boardId, columnId, title } = req.body;
    const board = await BoardModel.findById(boardId);

    const newColumn = {
      _id: columnId,
      title,
      cards: [],
    };

    board.columns.push(newColumn);

    board.save();

    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @route     GET /board/getCards?boardId&columnId
// @desc      get cards of a specfic board
// @access    private
export const getCards = async (req, res) => {
  const { boardId } = req.query;

  try {
    const cards = await CardModel.find({ board_id: boardId });

    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
