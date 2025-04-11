const express = require('express');
const router = express.Router();
const {
    getTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todoController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, getTodos);
router.get('/:id', authenticateToken, getSingleTodo);
router.post('/', authenticateToken, createTodo);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;