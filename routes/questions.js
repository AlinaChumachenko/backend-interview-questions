import express from 'express';
import { updateAnswer } from '../controllers/questionsController.js';
import {getQuestions, addQuestion, deleteQuestion} from '../controllers/questionsController.js';
import catchAsync from '../helpers/catchAsync.js';
import { answerSchema, questionSchema } from '../schemas/validationSchemas.js';
import validateBody from '../helpers/validateBody.js';

const router = express.Router();

router.get(
    '/', 
    catchAsync (getQuestions));

router.post(
    '/', 
    validateBody(questionSchema),
    catchAsync (addQuestion));

router.delete(
    '/:id', 
    catchAsync (deleteQuestion));

router.put(
    '/:id/answer', 
    validateBody(answerSchema),
    catchAsync (updateAnswer));

export default router;