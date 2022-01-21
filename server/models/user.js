import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("user", userSchema);
