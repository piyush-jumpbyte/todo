var mongoose = require('mongoose');
const schema = require('./database.schema');

const handlebars = {
    getAll : (req,res)=>{
        schema.todoModel.find({'userId':req.params.userId},(error,todoModels)=>{
            res.render('todolist',{
                todo: todoModels,
                userId: req.params.userId
            });
        });
        
    },

    displayForm : (req,res)=>{
        
        schema.todoModel.find({_id:req.params.id},(error,todoModels)=>{
            schema.commentModel.find({todoId:req.params.id},(error,commentModels)=>{
                res.render('display',{
                    todo: todoModels[0],
                    comments: commentModels,
                    userId: req.params.userId
                })
            });
        });   
    },

    displayEditForm : (req,res)=>{

        schema.todoModel.find({_id:req.params.todoId},(error,todoModels)=>{
                res.render('edit',{
                    todo: todoModels[0],
                    userId: req.params.userId
                })
        });
    },

    createPost : (req,res)=>{
        res.render('create',{
            userId: req.params.userId
        });
    },

    savePost : (req,res)=>{
        
        var enter = new schema.todoModel({
            userId: req.params.userId,
            name : req.body.todoname,
            description : req.body.tododescription,
            status : req.body.todocheckbox
        });

        enter.save();
        res.redirect(`/todolist/${req.params.userId}`);
    
    },

    updatePost : (req,res)=>{

        schema.todoModel.find({_id:req.params.todoId},(error,todoModels)=>{
            todoModels[0].name=req.body.todoname;
            todoModels[0].description= req.body.tododescription;
            todoModels[0].status=req.body.todocheckbox;
            todoModels[0].save();
        });
        res.redirect(`/todolist/${req.params.userId}`);
    },

    deleteGet : (req,res)=>{
        schema.todoModel.find({_id:req.params.todoId},(error,todoModels)=>{
           todoModels[0].remove();
        });
        res.redirect(`/todolist/${req.params.userId}`);
    }
}

handlebars.setup = (app)=> {

    app.get('/todolist/:userId', handlebars.getAll)

    app.get('/display/:id/:userId', handlebars.displayForm);

    app.get('/edit/:todoId/:userId', handlebars.displayEditForm);

    app.post('/create/:userId',handlebars.createPost);

    app.post('/save/:userId', handlebars.savePost);

    app.post('/edited/:todoId/:userId', handlebars.updatePost);

    app.get('/delete/:todoId/:userId', handlebars.deleteGet);

}

module.exports = handlebars;