const BadRequestError = require('./badrequest')
const CustomAPIError = require('./customerror')
const NotFoundAPIError = require('./notfound')
const UnathenticatedAPIError = require('./unathenticated')

module.exports = {
    BadRequestError,
    CustomAPIError,
    NotFoundAPIError,
    UnathenticatedAPIError
}