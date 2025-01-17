// middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    res.status(500).render('error/index', {
        title: 'Error',
        message: err.message,
        error: err // Kirim error ke view
    });
}

module.exports = errorHandler;