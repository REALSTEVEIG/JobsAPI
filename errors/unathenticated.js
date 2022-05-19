const CustomAPIError = require('./customerror')
const {StatusCodes} = require('http-status-codes')
class UnathenticatedAPIError extends CustomAPIError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnathenticatedAPIError