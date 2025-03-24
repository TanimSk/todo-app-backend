const express = require("express");
const router = express.Router();
const todoModel = require("../models/todoModel");

// GET all todos
export async function getTodos(req, res) {
    try {
        const result = await todoModel.getAllTodos();
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
export async function getSingleTodo(req, res) {
    try {
        const result = await todoModel.getTodoById(req.params.id);
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
export async function createTodo(req, res) {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Title is required" });
        }
        const result = await todoModel.createTodo(title, description);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// DELETE one single todo
export async function deleteTodo(req, res) {
    try {
        const result = await todoModel.deleteTodo(req.params.id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

// UPDATE one single todo
export async function updateTodo(req, res) {
    try {
        const { title, description, is_completed } = req.body;
        if (!title || !description || is_completed === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const result = await todoModel.updateTodo(req.params.id, title, description, is_completed);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}
