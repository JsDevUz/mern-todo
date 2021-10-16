const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status:{
        type: String,
        default: 'OPEN'
    },
    assignedTo:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = {TodoModel: model('Todo',schema)}