import express from "express";
import {
  createBoard,
  getBoards,
  addColumn,
  getBoard,
  createCard,
  getCards,
  getCard,
  changeCardTitle,
  changeCardLabel,
  changeCardDescription,
} from "../controllers/board.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createBoard", auth, createBoard);
router.get("/getBoards", auth, getBoards);
router.get("/getBoard/:boardId", auth, getBoard);
router.put("/addColumn", auth, addColumn);
router.post("/createCard", auth, createCard);
router.get("/getCards", auth, getCards);
router.get("/getCard/:cardId", auth, getCard);
router.put("/changeCardTitle", auth, changeCardTitle);
router.put("/changeCardLabel", auth, changeCardLabel);
router.put("/changeCardDescription", auth, changeCardDescription);

export default router;
