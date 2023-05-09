// Importing required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// Setting the port number
const port = 8000;

// Creating an instance of the express server
const app = express();

// Using the body-parser and cookie-parser middleware
app.use(express.urlencoded({ extended: true }));
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

// mongoStore is used to store the session cookies in the database
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    // store: store,
    cookie :{
        maxAge: (1000*60*100)
    },
    // store:new MongoStore({mongooseConnection : db.connection}),
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
        mongooseConnection : db,
        autoRemove : 'disabled'
    }),
    function(err) {
        console.log(err || 'connected to MongoDB');
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Using the express router and importing the routes from the routes folder
const router = require('./routes');
app.use('/', router);   

// Starting the server and listening to the specified port number
app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server on port ${port} ${err.message}`);
    }
    console.log(`Listening on ${port}`);
});
