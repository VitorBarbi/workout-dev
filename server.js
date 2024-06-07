if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';
import connectDB from './src/config/database.js';
import initializePassport from './src/config/passport.js';
import indexRoute from './src/routes/index.js';
import authRoutes from './src/routes/auth.js';


// Connect to the database
await connectDB();

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;

// Get current module directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine to EJS for rendering templates
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'public/views'));

// Initialize Passport for authentication
initializePassport(passport);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
// Middleware for flash messages to display temporary messages to users
app.use(flash());
// Middleware to handle session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// Initialize Passport middleware for authentication
app.use(passport.initialize());
// Middleware to use Passport sessions
app.use(passport.session());
// Middleware to override HTTP methods
app.use(methodOverride('_method'));

// Define routes
app.use('/', indexRoute);
app.use('/', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});