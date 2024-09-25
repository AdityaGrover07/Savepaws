const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("./userSchema");

// const commentSchema = new Schema({ userId: String, content: String });

const socialSchema = new Schema({
  /*
  unique Id of the pet
  */

  likes: [String],
  petId: { type: String },
  comments: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Social = mongoose.model("Social", socialSchema);

module.exports = { Social };
