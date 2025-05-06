
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import questionsRoutes from './routes/questions.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true
  }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);         
app.use('/api/questions', questionsRoutes); 
app.use('/api', aiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


