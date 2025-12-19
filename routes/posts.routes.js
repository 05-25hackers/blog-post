const express = require('express')
const {CREATE_POST, UPDATE_POST} = require("../controllers/posts.controller.js")
const {checkToken} = require("../middlewares/auth.middleware.js")

const route = express.Router()

route.post("/post", checkToken, CREATE_POST)
route.put("/post/:id", checkToken, UPDATE_POST)


module.exports = route