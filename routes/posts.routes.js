const express = require('express')
const {CREATE_POST} = require("../controllers/posts.controller.js")
const {checkToken} = require("../middlewares/auth.middleware.js")

const route = express.Router()

route.post("/post", checkToken, CREATE_POST)
module.exports = route