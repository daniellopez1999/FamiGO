import { Router } from 'express';
import { login, register, updateUserAvatar } from './controllers/users';
import { getAllUsers } from './middlewares/users';
import { isAuthenticated, isOwner } from './middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', isAuthenticated, getAllUsers);
router.put('/users/:id', isAuthenticated, isOwner, updateUserAvatar);

export default router;
