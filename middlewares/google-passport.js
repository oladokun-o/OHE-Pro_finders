const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const db = require('../config/index').get(process.env.NODE_ENV);


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: db.CLIENT_ID,
            clientSecret: db.CLIENT_SECRET,
            callbackURL: "/google/callback"
        },
        async(accessToken, refreshToken, profile, email, done) => {
            var userMail = email._json.email;
            const newUser = {
                googleId: email._json.sub,
                displayName: email._json.name,
                firstname: email._json.family_name,
                lastname: email._json.given_name,
                //image: email.photos[0].value
                email: email._json.email
            }
            try {
                let user = await User.findOne({ email: email._json.email });

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user);
                }
            } catch (err) {
                console.log(err);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}