const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({ email: email })
        .then(function(user){
            if(!user || user.password != password) {
                console.log('Invalikd username/password mismatch');
                return done(null,false);
            }
            return done(null,user);
        })
        .catch(function(err){
            console.log('Error in finding user ---> Passport: ' + err.message);
            return done(err);
        })

    }

));

// serialize user to decide which key to store in the cookie
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserialize the user from the key in the cookie
passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(function(user) {
        return done(null, user);
    })
    .catch(function(err){
        console.log('Error in finding user ---> Passport: ' + err.message);
        return done(err);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){

    // if the user is authenticated and signed in 
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req, res,next){
    if(req.isAuthenticated()){
        // req.user contains the curren signed in user from the session cookie 
        // and we're just sending this to the locals for the view
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;