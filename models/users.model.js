const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    gmail: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: Number,
    password: {
        type: String,
        required: true
    },

    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "posts"
        }
    ],
    comment: [
        {
            type: mongoose.Types.ObjectId,
            res: "comments"
        }
    ]
})


const User = mongoose.model('users', userSchema)

module.exports = {
    User
}