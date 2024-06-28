import express from 'express';
import { renderHomePage, renderNewPage, renderNewGroup, renderNewExercise, createProgram } from '../controllers/programController.js';
import checkAuthenticated from '../middleware/checkAuthenticated.js';

// Create a new router object
const router = express.Router();

// Define routes for program management

// Route to render the program home page, accessible only if the user is authenticated
router.get('/program', checkAuthenticated, renderHomePage);

// Route to render the page for creating a new program, accessible only if the user is authenticated
router.get('/program/new', checkAuthenticated, renderNewPage);

// Route to render the partial view for adding a new group, accessible only if the user is authenticated
router.get('/program/newGroup', checkAuthenticated, renderNewGroup);

// Route to render the partial view for adding a new exercise to a group, accessible only if the user is authenticated
router.get('/program/newExercise', checkAuthenticated, renderNewExercise);

// Route to handle the creation of a new program, accessible only if the user is authenticated
router.post('/program', checkAuthenticated, createProgram);

export default router;