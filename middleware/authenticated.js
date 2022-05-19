const {UnathenticatedAPIError} = require('../errors')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnathenticatedAPIError('Token not found!')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId : payload.userId, name : payload.name}
        next()
    } catch (error) {
        throw new UnathenticatedAPIError('Not authorized to access this resource!')
    }
}

module.exports = auth