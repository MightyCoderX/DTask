import express from 'express';
import colors from 'colors';
import { config as dotenvConfig } from 'dotenv';

import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';

dotenvConfig();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () =>
{
    console.log(`Listening at http://localhost:${port}`);
});

import taskRoutes from './routes/taskRoutes.js';

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);
