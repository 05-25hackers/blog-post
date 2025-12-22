const { Post } = require("../models/posts.model.js");
const { User } = require("../models/users.model.js");
const { Comment } = require("../models/comments.model.js");

const CREATE_POST = async (req, res) => {
  let reqBody = req.body.body
  reqBody = JSON.parse(reqBody)


  const { title, body } = reqBody;
  const userId = req.user._id;
  const newData = await Post.create({
    title,
    body,
    img_name: "/uploads/" + req.imgName,
    user: userId,
  });
  await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: newData } });
  return res.json({
    message: "Success",
    data: newData,
  });
};
const GET_POSTS = async (req, res) => {
  const data = await Post.find();
  res.json({
    message: "Success",
    data: data,
  });
};
const DELETE_POST = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  await User.findByIdAndUpdate(req.user._id, { $pull: { posts: id } });
  res.json({
    message: "Ochirildi",
  });
};
const UPDATE_POST = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const data = await Post.findByIdAndUpdate(id, { title, body }, { new: true });
  res.json({
    message: "Yangilandi",
    data: data,
  });
};
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
module.exports = {
  CREATE_POST,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
};
