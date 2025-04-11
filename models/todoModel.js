const db = require("../config/db");

// Get all todos
async function getAllTodos(userId) {
    const sql = "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC";
    return await db.query(sql, [userId]);
}

// Get a single todo by ID
async function getTodoById(id, userId) {
    const sql = "SELECT * FROM todos WHERE id = $1 AND user_id = $2";
    return await db.query(sql, [id, userId]);
}

// Create a new todo
async function createTodo(userId, title, description) {
    const sql = "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *";
    return await db.query(sql, [userId, title, description]);
}

// Delete a todo by ID
async function deleteTodo(id, userId) {
    const sql = "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *";
    return await db.query(sql, [id, userId]);
}

// Update a todo by ID
async function updateTodo(id, title, description, is_completed, userId) {
    const sql = "UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *";
    return await db.query(sql, [title, description, is_completed, id, userId]);
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
};
