import mongoose from "mongoose";
const { Schema } = mongoose;

const boardSchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  //   cards: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "card",
  //     },
  //   ],
});

export default mongoose.model("board", boardSchema);
