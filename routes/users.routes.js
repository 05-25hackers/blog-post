const express = require('express')

const { GET, GET_USER_BY_ID, DELETE_USER, UPDATE_USER, } = require('../controllers/users.controller.js')
const { checkToken } = require('../middlewares/auth.middleware.js')
const route = express.Router()

route.get('/post', GET)
route.get('/post/:id', GET_USER_BY_ID)
route.delete('/post/:id', checkToken, DELETE_USER)
route.put('/post/:id', checkToken, UPDATE_USER)

module.exports = route
