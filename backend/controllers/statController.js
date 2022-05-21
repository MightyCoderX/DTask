import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Stat from '../models/statModel.js';

// @desc    Get daily stats
// @route   GET /api/stats/daily
// @acces   Private
export const getDailyStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.find({ user: req.user.id });
    res.json(stats);
});

// @desc    Get weekly stats
// @route   GET /api/stats/weekly
// @acces   Private
export const getWeeklyStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.find({ user: req.user.id });
    res.json(stats);
});

// @desc    Get monthly stats
// @route   GET /api/stats/monthly
// @acces   Private
export const getMonthlyStats = asyncHandler(async (req, res) =>
{
    const stats = await Stat.find({ user: req.user.id });
    res.json(stats);
});

