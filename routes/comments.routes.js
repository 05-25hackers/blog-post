const express = require('express')
const {CREATE_COMMENT, DELETE_COMMENT} = require('../controllers/comments.controller.js')

const route = express.Router()

route.post('/post/:id/comment', checkToken, CREATE_COMMENT)
route.delete('/comment/:id', checkToken, DELETE_COMMENT)

module.exports = route