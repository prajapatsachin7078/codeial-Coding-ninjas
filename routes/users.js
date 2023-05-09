// Importing the Express library
const express = require('express');

// Creating a router instance
const router = express.Router();

// Importing the user_controller
const usersController = require('../controllers/user_controller');

// Importing the pasport 
const passport = require('passport');

// Defining the routes and the respective controller functions
router.get('/profile',passport.checkAuthentication, usersController.profile); // Route for user profile
router.get('/sign-up', usersController.signUp); // Route for user sign-up page
router.get('/sign-in', usersController.signIn); // Route for user sign-in page

router.post('/create', usersController.create); // Route for submitting the sign-up form

// Route for submitting the sign-in form and creating a new session and use passport as a  middleware for authenticating
router.post('/create-session',
    passport.authenticate(
        'local',
        {
            successRedirect: '/users/profile',
            failureRedirect: '/users/sign-in'
        }
    ),
    usersController.createSession
);


// Exporting the router module
module.exports = router;