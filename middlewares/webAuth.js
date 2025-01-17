function webAuth(req, res, next) {
    console.log('Checking auth. Session:', req.session);
    if (!req.session.user) {
        console.log('No session found, redirecting to login');
        return res.redirect('/login');
    }
    console.log('Auth successful, proceeding to next middleware');
    next();
}

module.exports = webAuth;
