const { Comment } = require("../models/comments.model.js");

const { Post } = require("../models/posts.model.js");

const { User } = require("../models/users.model.js");

const CREATE_COMMENT = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  const newComment = await Comment.create({
    text,
    user: userId,
    post: id,
  });
  await Post.findByIdAndUpdate(id, { $push: { comment: newComment._id } });

  await User.findByIdAndUpdate(userId, { $push: { comment: newComment._id } });
  res.json({
    message: "Izoh qoshildi",
    data: newComment,
  });
};

const GET_COMMENTS = async (req, res) => {
  const data = await Comment.find();
  res.json({
    message: "Success",
    data: data,
  });
};

const DELETE_COMMENT = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (comment) {
      await Post.findByIdAndUpdate(comment.post, { $pull: { comment: id } });
      
    await User.findByIdAndUpdate(comment.user, { $pull: { comment: id } });
  }

  res.json({
    message: "Izoh o'chirildi",
  });
};

const UPDATE_COMMENT = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const data = await Comment.findByIdAndUpdate(id, { text }, { new: true });

  res.json({
    message: "Yangilandi",
    data: data,
  });
};
module.exports = {
    CREATE_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    UPDATE_POST,
}
