import { Router } from 'express';
import multer from 'multer';
import {
  login,
  register,
  updateUserAvatar,
  updateUsername,
  updatePassword,
} from './controllers/users';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from './controllers/cloudinary';
import { getAllUsers } from './middlewares/users';
import { isAuthenticated, isOwner } from './middlewares';

import { getPosts, publishActivity } from './controllers/activity';

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

router.get('/profile/:id', isAuthenticated, getPosts);
//Activities
router.post('/publish-activity', isAuthenticated, publishActivity);

const upload = multer();
router.post('/image', upload.any(), uploadToCloudinary);
router.delete('/image/:publicId', deleteFromCloudinary);

export default router;
