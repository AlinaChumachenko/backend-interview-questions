import express from 'express';
import { generateAnswer } from '../controllers/aiController.js';


const router = express.Router();

router.post('/ai-answer', generateAnswer);

export default router;
