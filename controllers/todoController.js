const express = require("express");
const router = express.Router();
const todoModel = require("../models/todoModel");

// GET all todos
async function getTodos(req, res) {
    try {
        const userId = req.user.id;
        const result = await todoModel.getAllTodos(userId);
        if (result.rows.length === 0) {
            return res.status(404).json([]);
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// GET single todo
async function getSingleTodo(req, res) {
    try {
        const result = await todoModel.getTodoById(req.params.id, req.user.id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// POST one single todo
async function createTodo(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        if (!title) {
            return res.status(400).send({ message: "Title is required" });
        }
        const result = await todoModel.createTodo(userId, title, description);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// DELETE one single todo
async function deleteTodo(req, res) {
    try {
        const result = await todoModel.deleteTodo(req.params.id, req.user.id);        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", todo: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// UPDATE one single todo
async function updateTodo(req, res) {
    try {
        const { title, description, is_completed } = req.body;
        if (!title || !description || is_completed === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const result = await todoModel.updateTodo(req.params.id, title, description, is_completed, req.user.id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};