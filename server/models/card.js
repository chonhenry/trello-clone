import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "board",
    required: true,
  },
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  label: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  //   column_id: String,
});

export default mongoose.model("card", cardSchema);
