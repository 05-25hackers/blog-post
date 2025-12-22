const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
  },
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = { Comment };
