import { Router } from 'express';
import { getDailyStats, getWeeklyStats, getMonthlyStats, getAllStats, getAlltimeStats } from '../controllers/statController.js';
import { parseDateToQuery } from '../middleware/dateQueryMiddleware.js';

const router = new Router();

router.get('/', getAllStats);
router.get('/daily', parseDateToQuery, getDailyStats);
router.get('/weekly', parseDateToQuery, getWeeklyStats);
router.get('/monthly', parseDateToQuery, getMonthlyStats);
router.get('/alltime', parseDateToQuery, getAlltimeStats);

export default router;