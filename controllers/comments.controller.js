const {Comment} = require('../models/comments.model.js')

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
    DELETE_POST,
    UPDATE_POST,
}