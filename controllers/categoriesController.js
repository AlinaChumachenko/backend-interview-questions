import { getCategories, saveCategories, getQuestionsData, saveQuestionsData  } from '../utils/fileStorage.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllCategories = async (req, res) => {
  const categories = getCategories();
  res.json(categories);
};

export const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
     res.status(400).json({ message: 'Category name is required' });
     return;
  }

  const categories = getCategories();

  const exists = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  if (exists) {
     res.status(409).json({ message: 'Category already exists' });
     return;
  }

  const newCategory = {
    id: uuidv4(),
    name
  };

  categories.push(newCategory);
  saveCategories(categories);

  res.status(201).json(newCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  let categories = getCategories();

  const index = categories.findIndex(cat => cat.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const deletedCategory = categories.splice(index, 1)[0];
  saveCategories(categories);

  const allQuestions = getQuestionsData();
  const filteredQuestions = allQuestions.filter(q => q.category.toLowerCase() !== deletedCategory.name.toLowerCase());
  saveQuestionsData(filteredQuestions);

  res.json(deletedCategory);
};
  
