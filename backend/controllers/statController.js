import asyncHandler from 'express-async-handler';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

import Stat from '../models/statModel.js';
import mongoose from 'mongoose';

// @desc    Get all current user's stats
// @route   GET /api/stats/
// @acces   Private
export const getAllStats = asyncHandler(async (req, res) =>
{
    res.json(await Stat.find({ user: req.user.id}).select('-__v'));
});

// @desc    Get daily stats
// @route   GET /api/stats/daily
// @acces   Private
export const getDailyStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.find(
    { 
        user: req.user.id, 
        createdAt:
        {
            $gte: startOfDay(req.query.date),
            $lte: endOfDay(req.query.date)
        }
    })
    .select('addedTasks completedTasks editedTasks deletedTasks');

    res.json(stats[0] || {});
});

// @desc    Get weekly stats
// @route   GET /api/stats/weekly
// @acces   Private
export const getWeeklyStats = asyncHandler(async (req, res) =>
{
    const options = {
        weekStartsOn: 1
    }

    const stats = await Stat.aggregate([
        {
            $match:
            {
                user: mongoose.Types.ObjectId(req.user.id),
                createdAt:
                {
                    $gte: startOfWeek(req.query.date, options),
                    $lte: endOfWeek(req.query.date, options)
                }
            }
        },
        {
            $group:
            {
                _id: null,
                addedTasks: { $sum: "$addedTasks" },
                completedTasks: { $sum: "$completedTasks" },
                editedTasks: { $sum: "$editedTasks" },
                deletedTasks: { $sum: "$deletedTasks" }
            }
        }
    ]);

    res.json(stats[0] || {});
});

// @desc    Get monthly stats
// @route   GET /api/stats/monthly
// @acces   Private
export const getMonthlyStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.aggregate([
        {
            $match:
            {
                user: mongoose.Types.ObjectId(req.user.id),
                createdAt:
                {
                    $gte: startOfMonth(req.query.date),
                    $lte: endOfMonth(req.query.date)
                }
            }
        },
        {
            $group:
            {
                _id: null,
                addedTasks: { $sum: "$addedTasks" },
                completedTasks: { $sum: "$completedTasks" },
                editedTasks: { $sum: "$editedTasks" },
                deletedTasks: { $sum: "$deletedTasks" }
            }
        }
    ]);

    res.json(stats[0] || {});
});

// @desc    Get all time stats
// @route   GET /api/stats/alltime
// @acces   Private
export const getAlltimeStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.aggregate([
        {
            $match:
            {
                user: mongoose.Types.ObjectId(req.user.id)
            }
        },
        {
            $group:
            {
                _id: null,
                addedTasks: { $sum: "$addedTasks" },
                completedTasks: { $sum: "$completedTasks" },
                editedTasks: { $sum: "$editedTasks" },
                deletedTasks: { $sum: "$deletedTasks" }
            }
        }
    ]);

    res.json(stats[0] || {});
});

export const updateUserStats = async (user, update) =>
{
   const stats = await Stat.findOneAndUpdate(
        { 
            user,
            createdAt:
            {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date())
            }
        },
        update,
        {
            new: true,
            upsert: true
        }
    );

    console.log(stats, update);
}


