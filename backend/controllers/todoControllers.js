import mongoose from 'mongoose';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Todo from '../models/todoModel.js';

export const createTodo = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
        console.log("Todo created by User ID:", req.user.id);

    try {
        const todo = new Todo({
            title,
            description,
            user: req.user.id, //user id stored in req.user by authenticate middleware
        });
        await todo.save();
        res.status(201).json({ message: 'Todo created successfully', data: todo });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in todo creation', error });
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).populate('user', 'username email'); // Populate user details
        res.status(200).json({ message: 'Todos retrieved successfully', data: todos });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in fetching todos', error });
    }
}