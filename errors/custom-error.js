
class CustomAPIError extends Error {
    constructor (message, statusCode) {
        super(message) // this is child class - which invokes a constructor from the parent Error
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = {
    createCustomError,
    CustomAPIError,
}