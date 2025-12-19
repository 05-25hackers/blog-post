const jwt = require('jsonwebtoken')
require('dotenv')

const SECRET_KEY = process.env.SECRET_KEY
const checkToken = (req, res, next) => {
	let token = req.headers['authorization']
	if (!token)
		return res.json({
			status: 401,
			massage: 'Not connected',
		})

        
	token = token.split(' ')[1]
	let data = jwt.verify(token, SECRET_KEY)
	req.user = data

	next()
}

module.exports = {
	checkToken,
}
