const {Router}= require('express')
const {
    createTodo,
    getTodos,
    getTodo,
    updateStatus,
    updateTodo,
    deleteTodo
} = require('../controllers/todo.controller')
const router = Router()

router.post('/create',createTodo)
router.get('/',getTodos)
router.get('/:id',getTodo)
router.patch('/:id/status',updateStatus)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

module.exports = {
    todoRouter:router
}