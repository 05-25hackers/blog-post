const { User } = require('../models/users.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const SECRET_KEY = 'juda_vapshe_hechkimbilmas_otaham_maxfiy_kalit'

const LOGIN = async (req, res) => {
	const { phone, password } = req.body
	let foundUser = await User.findOne({ phone })
	if (!foundUser) return res.json({ message: 'User not found' })
	const isCorrectPassword = bcrypt.compare(password, foundUser.password)
	if(!isCorrectPassword) return res.json({
		message: "Wrong password"
	})
	const payload = {
		_id: foundUser._id,
		phone: foundUser.phone,
		name: foundUser.name,
	}
	const token = jwt.sign(
		payload,
		SECRET_KEY,
	)
	res.json({
		message: 'Successfully logged in',
		token,
	})
}

module.exports = {
	LOGIN
}