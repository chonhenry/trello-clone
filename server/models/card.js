import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = Schema(
  {
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    column_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("card", cardSchema);
