const express = require('express')
const {connectDb} = require('./services/db/db')
const {todoRouter}  = require('./src/routes/todo.router')
const {userRouter} = require('./src/routes/user.router')
const { authRouter } = require("./src/routes/auth.router");
const {checkUser} = require('./src/middleware/checkUser.middleware')
const app = express()
app.use(express.json())

require('dotenv').config()
app.use('/api/todo', checkUser,todoRouter)
app.use('/api/user',checkUser, userRouter)
app.use('/auth', authRouter);

app.use(function(err,req,res,next){
    console.log('err')
    res.status(400).send({
        message: err.message
    })
    next()
})
const PORT = process.env.APP_PORT
app.listen(PORT, connectDb)

