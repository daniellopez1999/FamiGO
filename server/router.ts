import { Router } from 'express';
import {
  login,
  register,
  updateUserAvatar,
  updateUsername,
  updatePassword,
  getUserInfo,
} from './controllers/users';
import { getAllUsers } from './middlewares/users';
import { isAuthenticated, isOwner } from './middlewares';

import { getUserData, publishActivity } from './controllers/activity';

const router = Router();

//Users
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

router.get('/profile/:id', isAuthenticated, getUserInfo, getUserData);

//Activities
router.post('/publish-activity', isAuthenticated, publishActivity);
//Get Activities from specific user
router.get('/profile/:id', isAuthenticated, getUserData);
export default router;
