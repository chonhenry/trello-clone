import express from "express";
import {
  createBoard,
  getBoards,
  addColumn,
  getBoard,
  createCard,
  addCard,
} from "../controllers/board.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createBoard", auth, createBoard);
router.get("/getBoards", auth, getBoards);
router.get("/:boardId", auth, getBoard);
router.put("/addColumn", auth, addColumn);
router.post("/createCard", auth, createCard, addCard);

export default router;
