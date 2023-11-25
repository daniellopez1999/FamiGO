import { Router } from 'express';
import {
  login,
  register,
  updateUserAvatar,
  updateUsername,
  updatePassword,
} from './controllers/users';
import { getAllUsers } from './middlewares/users';
import { isAuthenticated, isOwner } from './middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', isAuthenticated, getAllUsers);
router.put('/users/:id', isAuthenticated, isOwner, updateUserAvatar);
router.put(
  '/users/user_username/:id',
  isAuthenticated,
  isOwner,
  updateUsername
);
router.put(
  '/users/user_password/:id',
  isAuthenticated,
  isOwner,
  updatePassword
);

export default router;
