const { Post } = require("../models/posts.model.js");
const { User } = require("../models/users.model.js");

const CREATE_POST = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user._id;
  const newData = await Post.create({
    title,
    body,
    user: userId,
  });
  await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: newData } });
  return res.json({
    message: "Success",
    data: newData,
  });
};
const UPDATE_POST = (req, res) => {};
const DELETE_POST = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ message: "Post topilmadi" });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ message: "Post ochirildi" });
  } catch (error) {
    return res.json({ message: "Server xatoligi", error: error.message });
  }
};


module.exports = {
  DELETE_POST,
  CREATE_POST,
  UPDATE_POST,
};
