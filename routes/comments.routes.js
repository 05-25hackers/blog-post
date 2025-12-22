const express = require('express')
const {DELETE_POST, UPDATE_POST} = require('../controllers/comments.controller.js')

const route = express.Router()

route.put('/comments/:id', UPDATE_POST)
route.delete('/comments/:id', DELETE_POST)

module.exports = route