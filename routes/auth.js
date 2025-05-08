import express from 'express';
import { loginUser, registerUser, getProfile } from '../controllers/authController.js';

import validateBody from '../helpers/validateBody.js';
import catchAsync from '../helpers/catchAsync.js';
import { registerSchema, loginSchema } from '../schemas/validationSchemas.js';

const router = express.Router();

router.post(
    '/register', 
    validateBody(registerSchema), 
    catchAsync(registerUser));
router.post(
    '/login', 
    validateBody(loginSchema), 
    catchAsync(loginUser));
router.get(
    '/profile', 
    catchAsync(getProfile));

export default router;