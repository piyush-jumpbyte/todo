var Mongoose = require('mongoose');
var passport = require('passport');
var googleAPI = require('passport-google-oauth2').Strategy;
var localStrategy = require('passport-local').Strategy;
const schema = require('./database.schema');
var bodyParser = require("body-parser");
var express = require('express');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    schema.googleModel.findOne({ 'id': id }).then((user) => {
        done(null, user._id);
    });
});

passport.use(new googleAPI({
    callbackURL: 'http://localhost:8080/google/redirect',
    clientID: '354679112216-52g52e5r2o6n4njikaesg638n2u70ncc.apps.googleusercontent.com',
    clientSecret: 'wJDCUqHdthTWOcXm-QlaouTx'
},
    (accessToken, refreshToken, profile, done) => {
        schema.googleModel.findOne({ 'id': profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            }
            else {
                new schema.googleModel({ id: profile.id, email: profile.email }).save().then((newUser) => {
                    done(null, newUser);
                })
            }
        });
    }

));

// passport.use(new localStrategy(
//     (email,password,done) => {
//         console.log('local passport.!');
//         // email = req.body.email;
//         // password = req.body.password;
        
//         schema.loginModel.findOne({email,password},(error,user)=>{
//             if(error) return console.error(error);
//             if(user)
//             {
//                 done(null,user);
//             }
//         })

//     }
// ));
