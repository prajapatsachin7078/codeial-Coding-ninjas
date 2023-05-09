// Require the mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Acquire the connection (to check if it's successful)
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'Error in connecting with MongoDB'));

// When the connection is open, log the success message
db.once('open', function() {
    console.log("Successfully connected to the database");
});