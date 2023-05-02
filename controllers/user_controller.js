const User = require('../models/user');

// Render user profile if user is logged in
module.exports.profile = function(req, res){
    // Check if user is logged in
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(function(user){
            // If user is found, render user profile page
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }
            // If user not found, redirect to sign in page
            return res.redirect('/users/sign-in');
        })
        .catch(function(err){
            console.error('Error in finding user', err);
            return res.redirect('/users/sign-in');
        });
    } else {
        // If user not logged in, redirect to sign in page
        return res.redirect('/users/sign-in');
    }
};

// Render sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
};

// Render sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
};

// Create new user with sign up data from browser
module.exports.create = function(req, res){
    // Check if password matches confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // Find user with email
    User.findOne({email: req.body.email})
    .then(function(user){
        // If user not found, create new user and redirect to sign in page
        if(!user){
            User.create(req.body)
                .then(function(user){
                    return res.redirect('/users/sign-in')
                })
                .catch(function(err){
                    console.error('Error in creating user', err);
                    return;
                })
        } else {
            // If user found, redirect to sign up page
            return res.redirect('back');
        }
    })
    .catch(function(err){
        console.error('Error in finding user', err);
        return;
    })
};

// Create new session for user upon sign in
module.exports.createSession = function(req, res){
    // Find user with email
    User.findOne({email:req.body.email})
    .then(function(user){
        // Handle success/User found
        if(user){
            // Handle incorrect password
            if(req.body.password != user.password){
                return res.redirect('back');
            }
            // Handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        // Handle user not found
        else{
            return res.redirect('back');
        }
    })
    .catch(function(err){
        console.error('Error in signing in the user',err);
        return;
    });
};
