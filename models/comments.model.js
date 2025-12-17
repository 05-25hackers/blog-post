const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    body: String,

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = { Comment }
