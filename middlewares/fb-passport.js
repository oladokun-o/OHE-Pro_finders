const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const db = require('../config/index').get(process.env.NODE_ENV);
const User = require('../models/user');
var express = require('express');
var app = express();


module.exports = function(passport) {
    passport.use(new FacebookStrategy({
            clientID: db.FB_CLIENT_ID,
            clientSecret: db.FB_CLIENT_SECRET,
            callbackURL: "/facebook/callback",
            profileFields: ['id', 'email', 'name']
        },
        async(accessToken, refreshToken, profile, done) => {
            var fb_email = { email: profile._json.email }
            if (fb_email.email == undefined) {
                fb_email.email = '';
            }
            const newuser = {
                facebookId: profile.id,
                //displayName: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: fb_email.email
            }
            try {
                var fb_id = { facebookId: profile.id };
                let user = await User.findOne({ $or: [{ email: fb_email.email }, { facebookId: fb_id.facebookId }] });
                if (user) {
                    console.log('user exists logging in')
                    done(null, user)
                } else {
                    console.log('creating user')
                    user = await User.create(newuser)
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