import argon2 from 'argon2';
import passport from 'passport';
import User from '../models/user.js';

/**
 * Renders the login page.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderLoginPage = (req, res) => {
    res.render('login.ejs');
};

/**
 * Renders the register page.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderRegisterPage = (req, res) => {
    res.render('register.ejs');
};

/**
 * Registers a new user.
 * 
 * Hashes the password and saves the user to the database.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const registerUser = async (req, res) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
};

/**
 * Logs out the user.
 * 
 * Ends the user session and redirects to the login page.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
};

/**
 * Authenticates a user using Passport's local strategy.
 * 
 * Redirects to the home page on success, or back to the login page on failure.
 */
export const loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});