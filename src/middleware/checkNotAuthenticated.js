/**
 * Middleware function to check if a user is not authenticated.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware or route handler.
 */
function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}

export default checkNotAuthenticated;