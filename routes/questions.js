import express from 'express';
import { updateAnswer } from '../controllers/questionsController.js';
import {getQuestions, addQuestion, deleteQuestion} from '../controllers/questionsController.js';

const router = express.Router();

router.get('/', getQuestions);

router.post('/', addQuestion);

router.delete('/:id', deleteQuestion);

router.put('/:id/answer', updateAnswer);

export default router;