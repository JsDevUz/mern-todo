const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    // todos:{
    //     type: Types.ObjectId,
    //     ref: 'todos',
    //     required: true
    // }
})

module.exports = {UserModel: model('User',schema)} 