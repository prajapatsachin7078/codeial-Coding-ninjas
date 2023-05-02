// Importing required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose'); 

// Setting the port number
const port = 8000;

// Creating an instance of the express server
const app = express();

// Using the body-parser and cookie-parser middleware
app.use(express.urlencoded());
app.use(cookieParser());

// Using the static file middleware to serve static files
app.use(express.static('./assets'));

// Extracting styles and scripts from the sub-pages into layout files
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Using the express-ejs-layouts middleware
app.use(expressLayout);

// Setting the view engine and views folder
app.set('view engine', 'ejs');
app.set('views', './views');

// Using the express router and importing the routes from the routes folder
const router = require('./routes/');
app.use('/', router);

// Starting the server and listening to the specified port number
app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server on port ${port} ${err.message}`);
    }
    console.log(`Listening on ${port}`);
});