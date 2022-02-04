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
  updateDate,
  saveColumnsOrder,
} from "../controllers/board.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createBoard", auth, createBoard);
router.get("/getBoards", auth, getBoards);
router.get("/getBoard/:boardId", auth, getBoard);
router.put("/addColumn", auth, addColumn);
router.put("/saveColumnsOrder", auth, saveColumnsOrder);
router.put("/updateDate", auth, updateDate);
router.post("/createCard", auth, createCard);
router.get("/getCards", auth, getCards);
router.get("/getCard/:cardId", auth, getCard);
router.put("/changeCardTitle", auth, changeCardTitle);
router.put("/changeCardLabel", auth, changeCardLabel);
router.put("/changeCardDescription", auth, changeCardDescription);

export default router;
