const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');

const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss/',
    dest: './assets/css/',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
                mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
                mongooseConnection : db,
                autoRemove : 'disabled'
            },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});


























// // Importing required modules
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const expressLayout = require('express-ejs-layouts');
// const db = require('./config/mongoose'); 
// // used for session cookies
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo');
// // Setting the port number
// const port = 8000;

// // Creating an instance of the express server
// const app = express();

// // Using the body-parser and cookie-parser middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Using the static file middleware to serve static files
// app.use(express.static('./assets'));

// // Extracting styles and scripts from the sub-pages into layout files
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

// // Using the express-ejs-layouts middleware
// app.use(expressLayout);

// // Setting the view engine and views folder
// app.set('view engine', 'ejs');
// app.set('views', './views');

// // mongoStore is used to store the session cookies in the database
// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     // store: store,
//     cookie :{
//         maxAge: (1000*60*100)
//     },
//     // store:new MongoStore({mongooseConnection : db.connection}),
//     // store: MongoStore.create({
//     //     mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
//     //     mongooseConnection : db,
//     //     autoRemove : 'disabled'
//     // }),
//     // function(err) {
//     //     console.log(err || 'connected to MongoDB');
//     // }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

// // Using the express router and importing the routes from the routes folder
// const router = require('./routes');
// app.use('/', router);   

// // Starting the server and listening to the specified port number
// app.listen(port, function(err){
//     if(err){
//         console.error(`Error in running the server on port ${port} ${err.message}`);
//     }
//     console.log(`Listening on ${port}`);
// });
