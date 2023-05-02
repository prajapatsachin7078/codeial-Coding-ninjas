// Importing the Mongoose library
const mongoose = require('mongoose');

// Creating a new user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    // Adding timestamps to the schema
    {
        timestamps: true
    }
);

// Creating a User model from the user schema
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;