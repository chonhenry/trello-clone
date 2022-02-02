import mongoose from "mongoose";
const { Schema } = mongoose;

const boardSchema = Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    columns: [
      {
        // _id: Schema.Types.ObjectId,
        _id: String,
        title: String,
        cards: [
          {
            type: Schema.Types.ObjectId,
            ref: "card",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("board", boardSchema);
