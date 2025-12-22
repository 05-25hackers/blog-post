const {Comment} = require('../models/comments.model.js')

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

const DELETE_POST = async (req, res) => {
    try {
        const post = await Comment.findById(req.params.id)
        if (!post) {
            return res.json({ message: 'comment topilmadi' })
        }
        await Post.findByIdAndDelete(req.params.id)
        return res.json({ message: 'comment ochirildi' })
    } catch (error) {
        return res.json({ message: 'Server xatoligi', error: error.message })
    }
}

const UPDATE_POST = async (req, res) => {
    const { body } = req.body
    const _id = req.params.id
    const updatedComment = await Comment.findByIdAndUpdate({ _id }, body )
    if (!updatedComment)
        res.json({
            message: 'User not found',
        })
    res.json({
        message: 'Successfully updated',
        data: updatedComment,
    })
}
module.exports = {
    CREATE_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    UPDATE_POST,
}