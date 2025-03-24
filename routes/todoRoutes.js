const express = require('express');
const router = express.Router();
import {
    getTodos,
    getSingleTodos,
    createTodo,
    updateTodo,
} from '../controllers/todoController';

router.get('/', getTodos);
router.get('/:id', getSingleTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);