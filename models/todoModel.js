const db = require("../config/db");

// Get all todos
async function getAllTodos() {
    const sql = "SELECT * FROM todos ORDER BY created_at DESC";
    return await db.query(sql);
}

// Get a single todo by ID
async function getTodoById(id) {
    const sql = "SELECT * FROM todos WHERE id = $1 ORDER BY created_at DESC";
    return await db.query(sql, [id]);
}

// Create a new todo
async function createTodo(title, description) {
    const sql = "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *";
    return await db.query(sql, [title, description]);
}

// Delete a todo by ID
async function deleteTodo(id) {
    const sql = "DELETE FROM todos WHERE id = $1 RETURNING *";
    return await db.query(sql, [id]);
}

// Update a todo by ID
async function updateTodo(id, title, description, is_completed) {
    const sql = "UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *";
    return await db.query(sql, [title, description, is_completed, id]);
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
};
