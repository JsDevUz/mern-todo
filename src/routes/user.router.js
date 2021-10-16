const {Router} = require('express')
const router = Router()

const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/user.controller')
const {userValid} = require('../middleware/uservalidation.middleware')

router.post('/',userValid,createUser)
router.get('/',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',userValid,updateUser)

module.exports = {userRouter: router} 