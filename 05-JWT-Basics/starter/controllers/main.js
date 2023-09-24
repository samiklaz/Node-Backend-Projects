const jwt = require("jsonwebtoken")
const {CustomAPIError, BadRequest} = require('../errors')

const login = async (req, res) => {

    const {username, password} = req.body
    if(!username || !password) {
        throw new BadRequest('Please Provide Email and Password')
    }

    // just for demo, normally provided by DB
    const id = new Date().getDate()

    const token = jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg: 'user created', token})

    res.send('Fake Login/Register/Signup Route')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data and your lucky number ${luckyNumber}`
    })
}

module.exports = {
    login,
    dashboard
}