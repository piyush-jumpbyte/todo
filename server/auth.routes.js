const schema = require('./database.schema');
var passport = require('passport');
const requirePassport = require('../server/passport');
var userId = ' ';

const handlebars = {
    loginGet: (req, res) => {
        if(req.isAuthenticated())
        {
            schema.todoModel.find({ 'userId': req.user._id }, (error, todoModels) => {
            res.render('todolist', {
                todo: todoModels,
                userId: req.user._id
            });
        });
        }
        res.render('login');
    },

    loginPost: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        console.log('login post');
        schema.loginModel.findOne({ 'email': email, 'password': password }, (error, loginModels) => {
            if (error) return console.error(error);
            if (loginModels) {
                userId = loginModels._id;
                res.redirect('/todos');

            }
            else {
                res.send('invalid credentials');
                res.redirect('/login')
            }
        });

    },

    registrationPost: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        var confirmPassword = req.body.confirmPassword;
        if (password == confirmPassword) {
            schema.loginModel.findOne({ 'email': email }, (error, loginModels) => {
                if (loginModels) {
                    res.render('register');
                }
                else {
                    var enter = new schema.loginModel({ email, password });
                    enter.save();
                    res.redirect('/todos');
                }
            });
        }
        else {
            res.render('register');
        }
    },

    registrationGet: (req, res) => {
        res.render('register');
    },

    logout: (req, res) => {
        res.redirect('/');
    },

    todos: (req, res) => {
        // console.log(req.user._id);
        schema.todoModel.find({ 'userId': userId }, (error, todoModels) => {
            res.render('todolist', {
                todo: todoModels,
                userId: userId
            });
        });
    },

    redirectPage: (req, res) => {
        schema.todoModel.find({ 'userId': req.user._id }, (error, todoModels) => {
            res.render('todolist', {
                todo: todoModels,
                userId: req.user._id
            });
        });
    }
}

handlebars.setup = (app) => {
    app.get('/', handlebars.loginGet);

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/google/redirect', passport.authenticate('google'), handlebars.redirectPage);

    app.get('/todos', handlebars.todos);

    app.get('/logout', handlebars.logout);

    app.get('/callRegister', handlebars.registrationGet);

    app.post('/login', handlebars.loginPost);

    app.post('/register', handlebars.registrationPost);

}

module.exports = handlebars;

// passport.authenticate('local', {
//     successRedirect: '/todos',
//     failureRedirect: '/',
//     failureFlash: true
// }),