import express from 'express';
import { generateAnswer } from '../controllers/aiController.js';
import { answerSchema } from '../schemas/validationSchemas.js';
import validateBody from '../helpers/validateBody.js';
import catchAsync from '../helpers/catchAsync.js';

const router = express.Router();

router.post(
    '/ai-answer',
     validateBody(answerSchema),
    catchAsync(generateAnswer));

export default router;
