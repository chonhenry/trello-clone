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


// userId: '61eb3be033953f679d5c79b5',
//   newCard: {
//     board_id: new ObjectId("61fa043042601df8bc7fc820"),
//     column_id: '14be6ad2-6c85-4ed9-9862-9f5ff47b0a92',
//     title: 'new card 3',
//     user_id: new ObjectId("61eb3be033953f679d5c79b5"),
//     _id: new ObjectId("61fc633f3aa7dac37d7b0e55"),
//     createdAt: 2022-02-03T23:20:31.454Z,
//     updatedAt: 2022-02-03T23:20:31.454Z,
//     __v: 0
//   }