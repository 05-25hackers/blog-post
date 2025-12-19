const {Post} = require("../models/posts.model.js")
const {User} = require("../models/users.model.js")

const CREATE_POST = async(req, res) => {
    const {title, body} = req.body
    const userId = req.user._id
    const newData = await Post.create({
        title,
        body,
        user: userId
    })
    await User.findByIdAndUpdate({_id: userId}, {$push:  {posts: newData}})
    return res.json({
        message: "Success",
        data: newData
    })
    
}
const UPDATE_POST = (req, res) => {

}
module.exports = {
    CREATE_POST, 
    UPDATE_POST
}