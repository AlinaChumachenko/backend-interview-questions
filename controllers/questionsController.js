import { getQuestionsData, saveCategories, saveQuestionsData } from '../utils/fileStorage.js';
import { getUserFromToken } from '../utils/authHelpers.js';
import {v4 as uuidv4} from 'uuid';

export const getQuestions = async (req, res) => {
  const userEmail = getUserFromToken(req);
  const allQuestions = getQuestionsData();

  const filteredQuestions = allQuestions.filter(q =>
    q.ownerEmail === null || q.ownerEmail === userEmail
  )

  res.json(filteredQuestions);
} 

export const addQuestion = async (req, res) => {
  const { question_en, question_uk, category } = req.body;

  if ((!question_en && !question_uk) || !category) {
      return res.status(400).json({ message: 'At least one language version and category are required' });
  }

  const ownerEmail = getUserFromToken(req);

  const questions = getQuestionsData();

  const newQuestion = {
      id: uuidv4(),
      category,
      question_en,
      question_uk,
      answer_en: '',
      answer_uk: '',
      ownerEmail: ownerEmail || null
    };

  questions.push(newQuestion);
  saveQuestionsData(questions);

  res.status(201).json(newQuestion);

}
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const userEmail = getUserFromToken(req);
  let questions = getQuestionsData();
  const index = questions.findIndex(q => q.id === id);

  if(index === -1) return res.status(404).json({message: 'Question not found'});

  const question = questions[index];

  if (!question.ownerEmail && question.ownerEmail !== userEmail) {
  return res.status(403).json({ message: 'You can delete only your own questions' });
}

  const deleted = questions.splice(index, 1);
  saveQuestionsData(questions);

  res.json(deleted[0]);
}


export const updateAnswer = async (req, res) => {
    const { id } = req.params;
    const { lang, answer } = req.body;
  
    if (!lang || !['en', 'uk'].includes(lang)) {
      return res.status(400).json({ message: 'Invalid or missing language' });
    }
  
    const userEmail = getUserFromToken(req);
    const questions = getQuestionsData();
    const index = questions.findIndex(q => q.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const question = questions[index];
  
    if (!question.ownerEmail && question.ownerEmail !== userEmail) {
      return res.status(403).json({ message: 'You can update only your own questions' });
    }


    if (lang === 'en') {
      questions[index].answer_en = answer;
    } else {
      questions[index].answer_uk = answer;
    }
  
    try {
      saveQuestionsData(questions);
      res.json(questions[index]);
    } catch (err) {
      console.error('Saving error:', err);
      res.status(500).json({ message: 'Internal server error while saving answer' });
    }
  };
  