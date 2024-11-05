import express from 'express';
import { loginUser, logoutUser, registerUser } from './userService';

const router = express.Router();

router.post('/user/login', loginUser);

router.post('/user/logout', logoutUser);

router.post('/user/register', registerUser);

export default router;
