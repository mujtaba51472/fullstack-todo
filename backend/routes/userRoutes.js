import express from 'express';
const router = express.Router();
import { registerUser , loginUser, logoutUser, getUsers} from '../controllers/userControllers.js';
import { authenticate } from '../middleware/authenticate.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', authenticate, logoutUser);
router.get('/logout',  authenticate, logoutUser);
router.get('/', authenticate, getUsers); 


export default router;
