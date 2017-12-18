var Mongoose = require('mongoose');
var passport = require('passport');
var googleAPI = require('passport-google-oauth2').Strategy;
var googleModel = Mongoose.model('googleModel')
var promise = require('mpromise');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    googleModel.findOne({ 'id': id }).then((user) => {
        done(null, user._id);
    });
});

passport.use(new googleAPI({
    callbackURL: 'http://localhost:8080/google/redirect',
    clientID: '354679112216-52g52e5r2o6n4njikaesg638n2u70ncc.apps.googleusercontent.com',
    clientSecret: 'wJDCUqHdthTWOcXm-QlaouTx'
},
    (accessToken, refreshToken, profile, done)=> {
        googleModel.findOne({ 'id': profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            }
            else {
                new googleModel({ id: profile.id, email: profile.email }).save().then((newUser) => {
                    done(null, newUser);
                })
            }
        });
    }

));
