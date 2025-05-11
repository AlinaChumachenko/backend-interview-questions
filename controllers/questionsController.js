import {getQuestionsData, saveQuestionsData} from '../utils/fileStorage.js';
import {v4 as uuidv4} from 'uuid';

export const getQuestions = async (req, res) => {
  
    const questions = getQuestionsData();
    res.json(questions);
} 

export const addQuestion = async (req, res) => {
    const { question, category } = req.body;

    if(!question || !category) {
        return res.status(400).json({message: 'Question and category are required'})
    }
    const questions = getQuestionsData();

    const newqQuestion = {
        id: uuidv4(),
        question,
        answer: '',
        category
    }

    questions.push(newqQuestion);
    saveQuestionsData(questions);

    res.status(201).json(newqQuestion);

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
    const { answer } = req.body;
  
    const questions = getQuestionsData();
    const index = questions.findIndex(q => q.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
  
    questions[index].answer = answer;
    saveQuestionsData(questions);
  
    res.json(questions[index]);
  };
  