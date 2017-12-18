const schema = require('./database.schema');

const handlebars = {
    deleteGet : (req,res)=>{

        schema.commentModel.find({_id:req.params.commentId,todoId:req.params.todoId},(error,comment)=>{
            console.log(comment);
            comment[0].remove();
        });
        res.redirect(`/display/${req.params.todoId}/${req.params.userId}`);
    },

    addPost : (req,res)=>{
        
        var enter = new schema.commentModel({
            todoId : req.params.todoId,
            text : req.body.comments,
            date : Date()
        });
       enter.save();
       res.redirect(`/display/${req.params.todoId}/${req.params.userId}`);
    
    }
}

handlebars.setup = (app)=>{

    app.get('/commentDelete/:todoId/:commentId/:userId', handlebars.deleteGet);

    app.post('/comments/:todoId/:userId', handlebars.addPost);
}
    
module.exports = handlebars;