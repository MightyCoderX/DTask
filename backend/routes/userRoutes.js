import { Router } from 'express';
import { getMe, loginUser, registerUser } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;