import { Router } from 'express';
import { getTasks, setTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = new Router();

router.route('/').get(getTasks).post(setTask);

router.route('/:id').delete(deleteTask).put(updateTask);

export default router;