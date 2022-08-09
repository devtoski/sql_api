const asyncHandler = (result) => async (req, res, next) => {
    try {
        await result(req, res, next);
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    return true;
}

module.exports = {
    asyncHandler
}