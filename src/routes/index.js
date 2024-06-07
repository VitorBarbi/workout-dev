import express from 'express';
import { renderHomePage } from '../controllers/homeController.js';
import checkAuthenticated from '../middleware/checkAuthenticated.js';

// Create a new router object
const router = express.Router();

// Define home page route
router.get('/', checkAuthenticated, renderHomePage);

export default router;