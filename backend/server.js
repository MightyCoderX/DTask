import express from 'express';
import cors from 'cors';
import colors from 'colors';
import { config as dotenvConfig } from 'dotenv';

import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';

import { protect } from './middleware/authMiddleware.js';

dotenvConfig();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.74:3000']
}));

app.listen(port, () =>
{
    console.log(`Listening at http://localhost:${port}`);
});

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/tasks', protect, taskRoutes);
app.use('/api/stats', protect, statsRoutes);

app.use(errorHandler);
