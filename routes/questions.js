import express from 'express';

import {getQuestions, addQuestion, deleteQuestion} from '../controllers/questionsController.js';

const router = express.Router();

router.get('/', getQuestions);

router.post('/', addQuestion);

router.delete('/:id', deleteQuestion);

export default router;