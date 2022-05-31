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
    
    if(Object.keys(req.body).includes('completed') && task.completed && !req.body.completed)
    {
        res.status(403);
        throw new Error('Cannot un-complete task!');
    }
    
    
    if(Object.keys(req.body).includes('text') && task.completed)
    {
        res.status(403);
        throw new Error('Cannot edit completed task!');
    }

    const updateQuery = {};

    if(Object.keys(req.body).includes('text')) updateQuery.text = req.body.text;
    if(Object.keys(req.body).includes('completed')) updateQuery.completed = req.body.completed;

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateQuery, { new: true });

    if(!task.completed && updatedTask.completed)
    {
        updateUserStats(req.user.id, { $inc: { 'completedTasks': 1 } });
    }
    
    if(Object.keys(req.body).includes('text') && !(task.completed || updatedTask.completed))
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
