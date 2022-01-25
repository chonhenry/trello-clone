import express from "express";
import { createBoard } from "../controllers/board.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createBoard", auth, createBoard);

export default router;
