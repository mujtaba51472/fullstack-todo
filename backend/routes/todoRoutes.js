import express from 'express';
const router = express.Router();
import { createTodo, getTodos } from '../controllers/todoControllers.js';
import { authenticate } from '../middleware/authenticate.js';
router.use(authenticate); // Apply authentication middleware to all routes in this router
router.post('/create', createTodo);
router.get('/', getTodos); 
export default router;