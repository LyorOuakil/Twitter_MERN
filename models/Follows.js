const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ]
  },
  { toJSON: { virtuals: true } }
);

module.exports = Follow = mongoose.model("follow", FollowSchema);
