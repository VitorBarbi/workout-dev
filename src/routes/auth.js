import express from 'express';
import { renderLoginPage, renderRegisterPage, registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import checkAuthenticated from '../middleware/checkAuthenticated.js';
import checkNotAuthenticated from '../middleware/checkNotAuthenticated.js';

// Create a new router object
const router = express.Router(); 

// Define routes for authentication
// Route to render the login page, accessible only if the user is not authenticated
router.get('/login', checkNotAuthenticated, renderLoginPage);
// Route to handle login form submission, accessible only if the user is not authenticated
router.post('/login', checkNotAuthenticated, loginUser);
// Route to render the register page, accessible only if the user is not authenticated
router.get('/register', checkNotAuthenticated, renderRegisterPage);
// Route to handle registration form submission, accessible only if the user is not authenticated
router.post('/register', checkNotAuthenticated, registerUser);
// Route to handle user logout, accessible only if the user is authenticated
router.delete('/logout', checkAuthenticated, logoutUser);

export default router;