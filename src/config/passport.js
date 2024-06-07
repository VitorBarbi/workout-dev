import { Strategy as LocalStrategy } from 'passport-local';
import argon2  from 'argon2';
import User from '../models/user.js';

/**
 * Initializes Passport with authentication strategies and user serialization and deserialization.
 * 
 * @param {object} passport - The Passport object to configure.
 */
function initialize(passport) {
    /**
     * Authenticates a user using email and password.
     * 
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @param {function} done - Callback function to be called after authentication.
     */
    const authenticateUser = async (email, password, done) => {
        try {
            // Find a user by email
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'No user found with this email address' });
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await argon2.verify(user.password, password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (e) {
            return done(e);
        }
    };

    // Use the Passport LocalStrategy to authenticate users
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    /**
     * Serializes the user by storing their ID in the session.
     * 
     * @param {object} user - The authenticated user.
     * @param {function} done - Callback function to be called after serialization.
     */
    passport.serializeUser((user, done) => done(null, user.id));

    /**
     * Deserializes the user by finding them by ID in the database.
     * 
     * @param {string} id - The ID of the user stored in the session.
     * @param {function} done - Callback function to be called after deserialization.
     */
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (e) {
            done(e);
        }
    });
}

export default initialize;