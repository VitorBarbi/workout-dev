import Program from '../models/program.js';

/**
 * Renders the home page for programs.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderHomePage = (req, res) => {
    res.render('program/index.ejs');
};

/**
 * Renders the page to create a new program.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderNewPage = (req, res) => {
    res.render('program/new.ejs');
};

/**
 * Renders the partial view for adding a new group.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderNewGroup = (req, res) => {
    const groupNumber = req.query.groupNumber;
    res.render('program/partials/newGroup', { groupNumber, layout: false });
};

/**
 * Renders the partial view for adding a new exercise.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderNewExercise = (req, res) => {
    const exerciseNumber = req.query.exerciseNumber;
    const groupNumber = req.query.groupNumber;
    res.render('program/partials/newExercise', {
        exerciseNumber, 
        groupNumber,
        layout: false
    });
};

/**
 * Handles the creation of a new program.
 * Parses the groups data from the request body and saves the new program to the database.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createProgram = async (req, res) => {
    try {
        // Extract start date and groups data from the request body
        const { startDate, groups } = req.body;

        // Parse the groups data from JSON string to JavaScript object
        const parsedGroups = JSON.parse(groups);

        // Create a new Program instance with the provided start date and parsed groups
        const newProgram = new Program({ startDate, groups: parsedGroups });

        // Save the new Program instance to the database
        await newProgram.save();

        // Set a success message to flash and redirecting to the new program page
        req.flash('success', 'Program saved successfully!');
        res.redirect('/program/new');
    } catch (err) {
        console.error(err);

        // Set an error message to flash and redirecting to the new program page with status 500
        req.flash('error', 'Failed to save program.');
        res.status(500).redirect('/program/new');
    }
};