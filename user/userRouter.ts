import express from 'express';
import { loginUser, logoutUser, registerUser, isAuthenticated } from './userService';

const router = express.Router();

router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);
router.post('/user/register', registerUser);

router.use(isAuthenticated);

export default router;
