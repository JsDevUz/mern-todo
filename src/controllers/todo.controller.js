const {TodoModel} = require('../models/todo.model')

async function createTodo(req,res){
    const {title,description,status,userId} = req.body

    try{
        const newTodo = new TodoModel({
            title,
            description,
            status,
            assignedTo: userId,
        })
        await newTodo.save()
        res.send({message: 'Todo has been created'})
    }catch(error){
        res.status(400).send({message: error.message})
    }
}

async function getTodos(req,res){
    const {status} = req.query
    console.log(req.user.userId)
    try{
        if(status !== undefined){
            const todos = await TodoModel.find({status:status,assignedTo:req.user.userId})
            res.send(todos)
        }else{
            const todos = await TodoModel.find({assignedTo:req.user.userId}).populate('assignedTo')
            res.send(todos)
        }
       
    }
    catch(e){
        res.status(500).send(e)
    }
}

async function getTodo(req,res){
    const {id} = req.params
    try{
        const todo = await TodoModel.find({_id:id})
        if(!todo){
            return res.send({message: 'Todo not found'})
        }
        res.send(todo)
    }
    catch(e){
        res.send(e)
    }
}

async function updateStatus(req,res){
    const {id} = req.params
    const {status} = req.body

    try{
        await TodoModel.findOneAndUpdate({_id:id},{status})
        res.send({message: 'status updated'})
    }
    catch(e){
        res.send(e)
    }
}
async function updateTodo(req,res){
    const {id} = req.params
    const {title,description,status,userId} = req.body

    try{
        await TodoModel.findOneAndUpdate({_id:id},{title,description,status,assignedTo:userId})
        res.send({message: 'Todo updated'})
    }
    catch(e){
        res.send(e)
    }
}

async function deleteTodo(req,res){
    const {id} = req.params
    try{
        await TodoModel.findByIdAndDelete(id)
        res.send({message: 'todo deleted'})
    }
    catch(e){
        res.send(e)
    }
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateStatus,
    updateTodo,
    deleteTodo
}