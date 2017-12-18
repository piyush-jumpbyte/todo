schema.todoModel.find({_id:temporaryid},(error,todoModels)=>{
            schema.commentModel.find({todoId:temporaryid},(error,commentModels)=>{
                console.log('commentModels');
                res.render('display',{
                    todo: todoModels[0],
                    comments: commentModels
                })
            });
        });   