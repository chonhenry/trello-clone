import express from "express";
import { createBoard, getBoards, addColumn } from "../controllers/board.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createBoard", auth, createBoard);
router.get("/getBoards", auth, getBoards);
router.put("/addColumn", auth, addColumn);

export default router;
