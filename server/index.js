import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import passport from 'p'
import cors from "cors";
import dotenv from "dotenv/config";
import userRouter from "./routes/user.js";
import boardRouter from "./routes/board.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: `hello ${process.env.TEST}` });
});

app.use("/user", userRouter);
app.use("/board", boardRouter);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
