const jwt = require("jsonwebtoken")
const {CustomAPIError, UnauthenticatedError } = require("../errors")


const authenticationMiddleware = async(req, res, next) => {
  const authheader = req.headers.authorization 
  if(!authheader || !authheader.startsWith('Bearer')) {
      throw new UnauthenticatedError('No token provided')
  }

  const token = authheader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('decoded === ', decoded)
    const {id, username} = decoded
    req.user = {id, username}
    next()
  } catch (error) {
      throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware