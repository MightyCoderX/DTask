import asyncHandler from 'express-async-handler';

export const parseDateToQuery = asyncHandler(async (req, res, next) =>
{
    const date = new Date(req.query.date);

    req.query.date = date.toString() === 'Invalid Date' ? new Date() : date;
    
    next();
});
