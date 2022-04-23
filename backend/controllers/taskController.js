import asyncHandler from 'express-async-handler';

// @desc    Get tasks
// @route   GET /api/tasks
// @acces   Private
export const getTasks = asyncHandler(async (req, res) =>
{
    res.json({ message: 'Get Tasks' });
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
    console.log(req.body);
    res.status(201).json({ message: 'Set Task' });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @acces   Private
export const updateTask = asyncHandler(async (req, res) =>
{
    res.json({ message: `Update task ${req.params.id}` });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @acces   Private
export const deleteTask = asyncHandler(async (req, res) =>
{
    res.json({ message: `Delete task ${req.params.id}` });
});
