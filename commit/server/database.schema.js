const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const login = new Schema({
    email: String,
    password: String
});

const google = new Schema({
    id: String,
    email: String
});

const todo = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        //required: 'Kindly enter the name of the task'
    },
    description: {
        type: String,
        //required: 'Kindly enter the description of the task'
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

const comment = new Schema({
    todoId: {
        type: mongoose.Schema.Types.ObjectId
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var commentModel = mongoose.model('commentModel', comment);
var todoModel = mongoose.model('todoModel', todo);
var googleModel = mongoose.model('googleModel', google);
var loginModel = mongoose.model('loginModel', login);

// const models = {
//     commentModel : commentModel,

//     todoModel : todoModel,

//     googleModel : googleModel,

//     loginModel : loginModel
// }

const models = {commentModel,todoModel,googleModel,loginModel}
module.exports = models;