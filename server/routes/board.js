import express from "express";
import { createBoard } from "../controllers/board.js";

const router = express.Router();

router.post("/createBoard", createBoard);

export default router;
