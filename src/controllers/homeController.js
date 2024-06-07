/**
 * Renders the home page.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderHomePage = (req, res) => {
    res.render('index.ejs');
};