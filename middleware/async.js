const asyncWrapper = (callback) => {
    return async (req, res, next) => {
        try {
            await callback (req, res, next)
        } catch (error) {
            next(error) // this is the default error handler
        }
    }
}

module.exports = asyncWrapper