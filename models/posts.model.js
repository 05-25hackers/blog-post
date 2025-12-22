const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: String,
	img_name: String,

	user: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
	},
	comment: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'comments',
		},
	],
})

const Post = mongoose.model('posts', postSchema)

module.exports = { Post }
