import asyncHandler from 'express-async-handler';

import { updateUserStats } from './statController.js';

import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

// @desc    Get tasks
// @route   GET /api/tasks
// @acces   Private
export const getTasks = asyncHandler(async (req, res) =>
{
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @acces   Private
export const setTask = asyncHandler(async (req, res) =>
{
    if(!req.body.text)
    {
        res.status(400);
        throw new Error('Please add a text field');
    }
    
    const task = await Task.create({
        text: req.body.text,
        user: req.user.id
    });

    updateUserStats(req.user.id, { $inc: { 'addedTasks': 1 } });

    res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @acces   Private
export const updateTask = asyncHandler(async (req, res) =>
{
    const task = await Task.findById(req.params.id);

    if(!task)
    {
        res.status(404);
        throw new Error('Task not found');
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    if(task.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(task.completed != updatedTask.completed)
    {
        updateUserStats(req.user.id, { $inc: { 'completedTasks': task.completed ? -1 : 1 } });
    }
    else if(task.text != updatedTask.text)
    {
        updateUserStats(req.user.id, { $inc: { 'editedTasks': 1 } });
    }

    res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @acces   Private
export const deleteTask = asyncHandler(async (req, res) =>
{
    const task = await Task.findById(req.params.id);

    if(!task)
    {
        res.status(404);
        throw new Error('Task not found');
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    if(task.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error('User not authorized');
    }

    await task.remove();

    updateUserStats(req.user.id, { $inc: { 'deletedTasks': 1 } });

    res.json(task);
});
