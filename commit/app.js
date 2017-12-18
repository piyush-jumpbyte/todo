var express = require('express');
var exphnd = require('express-handlebars');
var Handlebars = require('handlebars');
var ta = require('node-time-ago');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
const cookieSession = require('cookie-session');
var googleAPI = require('passport-google-oauth2').Strategy;
var todoRoutes = require('./server/todo.routes');
var commentRoutes = require('./server/comment.routes');
var authRoutes = require('./server/auth.routes');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs',exphnd({extname: 'hbs', defaultlayout: 'index'}));
app.set('views', __dirname + '/views/');
app.set('view engine','hbs');

app.use(cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: ['heyMyNameIsPiyush']
}));
app.use(passport.initialize());
app.use(passport.session());

//mongodb connection
mongoose.connection.openUri('mongodb://localhost/auth',()=> {
    console.log('connected successfully');
});

// Handlebars.registerHelper('timeago', function(time){
//     return ta(time);
// });

// Handlebars.registerHelper('customHelper', function(status,option){
//     if(status == 'complete')
//     {
//         return option.fn(this);
//     }
//     else
//     {
//         return option.inverse(this);
//     }
// });

authRoutes.setup(app);
todoRoutes.setup(app);
commentRoutes.setup(app);

module.exports = app;