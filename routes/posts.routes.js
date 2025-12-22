const express = require('express')
const multer = require('multer')

const {
	CREATE_POST,
	GET_POSTS,
	DELETE_POST,
	UPDATE_POST,
} = require('../controllers/posts.controller.js')
const { checkToken } = require('../middlewares/auth.middleware.js')
const route = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		let mimetype = file.mimetype.split("/")[1]
		req.imgName = file.fieldname + '-' + Date.now() + "." + mimetype
		cb(null, req.imgName)
	},
})

const uploads = multer({ storage: storage })
route.post('/post', checkToken, uploads.single('image'), CREATE_POST)
route.get('/post', GET_POSTS)
route.delete('/post/:id', checkToken, DELETE_POST)
route.put('/post/:id', checkToken, UPDATE_POST)
module.exports = route
