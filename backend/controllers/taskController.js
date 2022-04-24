import asyncHandler from 'express-async-handler';

import Task from '../models/taskModel.js';

// @desc    Get tasks
// @route   GET /api/tasks
// @acces   Private
export const getTasks = asyncHandler(async (req, res) =>
{
    const tasks = await Task.find({});
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
        text: req.body.text
    });

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

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

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

    await task.remove();

    res.json(task);
});
