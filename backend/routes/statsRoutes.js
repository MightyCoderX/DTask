import { Router } from 'express';
import { getDailyStats, getWeeklyStats, getMonthlyStats } from '../controllers/statController.js';

const router = new Router();

router.get('/daily', getDailyStats);
router.get('/weekly', getWeeklyStats);
router.get('/monthly', getMonthlyStats);

export default router;