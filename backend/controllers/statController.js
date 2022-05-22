import asyncHandler from 'express-async-handler';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

import User from '../models/userModel.js';
import Stat from '../models/statModel.js';
import mongoose from 'mongoose';

// @desc    Get daily stats
// @route   GET /api/stats/daily
// @acces   Private
export const getDailyStats = asyncHandler(async (req, res) =>
{
    let day;

    try
    {
        day = new Date(req.query.day)
    }
    catch(_) {}
    finally
    {
        day = new Date();
    }

    console.log('Day:', day);

    const stats = await Stat.find(
    { 
        user: req.user.id, 
        createdAt:
        {
            $gte: startOfDay(day),
            $lte: endOfDay(day)
        }
    }).select('-__v');

    res.json(stats);
});

// @desc    Get weekly stats
// @route   GET /api/stats/weekly
// @acces   Private
export const getWeeklyStats = asyncHandler(async (req, res) =>
{
    let firstDayOfWeek = new Date();

    try
    {
        firstDayOfWeek = new Date(req.query.firstDayOfWeek)
    }
    catch(_) {}
    finally
    {
        firstDayOfWeek = new Date();
    }

    const options = {
        weekStartsOn: 2
    }

    const stats = await Stat.aggregate([
        {
            $match:
            {
                user: mongoose.Types.ObjectId(req.user.id),
                createdAt:
                {
                    $gte: startOfWeek(firstDayOfWeek, options),
                    $lte: endOfWeek(firstDayOfWeek, options)
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

    res.json(stats);
});

// @desc    Get monthly stats
// @route   GET /api/stats/monthly
// @acces   Private
export const getMonthlyStats = asyncHandler(async (req, res) =>
{
    let firstDayOfMonth = new Date();

    try
    {
        firstDayOfMonth = new Date(req.query.firstDayOfWeek)
    }
    catch(_) {}
    finally
    {
        firstDayOfMonth = new Date();
    }

    const stats = await Stat.aggregate([
        {
            $match:
            {
                user: mongoose.Types.ObjectId(req.user.id),
                createdAt:
                {
                    $gte: startOfMonth(firstDayOfMonth),
                    $lte: endOfMonth(firstDayOfMonth)
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

    res.json(stats);
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