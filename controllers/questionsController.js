import { getQuestionsData, saveCategories, saveQuestionsData } from '../utils/fileStorage.js';
import {v4 as uuidv4} from 'uuid';

export const getQuestions = async (req, res) => {
  
    const questions = getQuestionsData();
    res.json(questions);
} 

export const addQuestion = async (req, res) => {
    const { question_en, question_uk,category } = req.body;

    if ((!question_en && !question_uk) || !category) {
        return res.status(400).json({ message: 'At least one language version and category are required' });
    }

    const questions = getQuestionsData();

    const newQuestion = {
        id: uuidv4(),
        category,
        question_en,
        question_uk,
        answer_en: '',
        answer_uk: ''
      };

    questions.push(newQuestion);
    saveQuestionsData(questions);

    res.status(201).json(newQuestion);

}



export const deleteQuestion = async (req, res) => {
    const { id } = req.params;
     let questions = getQuestionsData();
     const index = questions.findIndex(q => q.id ===id);

     if(index === -1) return res.status(404).json({message: 'Question not found'});
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
  
    const questions = getQuestionsData();
    const index = questions.findIndex(q => q.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Question not found' });
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
  