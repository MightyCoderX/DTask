import { Router } from "express";
import { getTasks, setTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = Router();

router.route('/').get(getTasks).post(setTask);

router.route('/:id').delete(updateTask).put(deleteTask);

export default router;