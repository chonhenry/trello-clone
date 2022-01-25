import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "board",
    required: true,
  },
  column_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
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
});

export default mongoose.model("card", cardSchema);
