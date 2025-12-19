const { User } = require('../models/users.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

// const SECRET_KEY = 'juda_vapshe_hechkimbilmas_otaham_maxfiy_kalit'

const REGISTER = async(req, res) => {

	const  {name , gmail, age ,phone ,password} = req.body
	if(!(name || gmail || age || phone || password)) return res.json({
		message: "Hoz qanday qoshishim kerak Malu'mot bo'masa"
	})

	const newUser = await User.create({
		name,
		gmail,
		age,
		phone,
		password: await bcrypt.hash(password, 12)
	})
	res.json({
		message: "Successfully registered",
		newUser
	})
}

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
	LOGIN,
	REGISTER
}