const { Post } = require('../models/posts.model.js')
const { User } = require('../models/users.model.js')

const CREATE_POST = async (req, res) => {
	const { title, body } = req.body
	const userId = req.user._id
	const newData = await Post.create({
		title,
		body,
		user: userId,
	})
	await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: newData } })
	return res.json({
		message: 'Success',
		data: newData,
	})
}
const DELETE_POST = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) {
			return res.json({ message: 'Post topilmadi' })
		}
		await Post.findByIdAndDelete(req.params.id)
		return res.json({ message: 'Post ochirildi' })
	} catch (error) {
		return res.json({ message: 'Server xatoligi', error: error.message })
	}
}

const UPDATE_POST = async (req, res) => {
	const { title, body } = req.body
	const _id = req.params.id
	const updatedUser = await Post.findByIdAndUpdate({ _id }, { title, body })
	if (!updatedUser)
		res.json({
			message: 'User not found',
		})
	res.json({
		message: 'Successfully updated',
		data: updatedUser,
	})
}
module.exports = {
	DELETE_POST,
	CREATE_POST,
	UPDATE_POST,
}
