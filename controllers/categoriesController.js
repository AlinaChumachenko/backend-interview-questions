import { getCategories, saveCategories, getQuestionsData, saveQuestionsData  } from '../utils/fileStorage.js';
import { getUserFromToken } from '../utils/authHelpers.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllCategories = async (req, res) => {
  const userEmail = getUserFromToken(req);
  const allCategories = getCategories();
 
  const filteredCategories = allCategories.filter(c=>
    c.ownerEmail === null || c.ownerEmail === userEmail
  )
  res.json(filteredCategories);
};

export const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
     res.status(400).json({ message: 'Category name is required' });
     return;
  }

  const ownerEmail = getUserFromToken(req);

  const categories = getCategories();

  const exists = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase()
&& (cat.ownerEmail === null || cat.ownerEmail === ownerEmail));

  if (exists) {
     res.status(409).json({ message: 'Category already exists' });
     return;
  }

  const newCategory = {
    id: uuidv4(),
    name,
    ownerEmail: ownerEmail || null
  };

  categories.push(newCategory);
  saveCategories(categories);

  res.status(201).json(newCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userEmail = getUserFromToken(req);
  let categories = getCategories();

  const index = categories.findIndex(cat => cat.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const category = categories[index];

  if (!category.ownerEmail && category.ownerEmail !== userEmail) {
    return res.status(403).json({ message: 'You can delete only your own categories' });
  }
  const deletedCategory = categories.splice(index, 1)[0];
  saveCategories(categories);

  const allQuestions = getQuestionsData();
  const filteredQuestions = allQuestions.filter(q => q.category.toLowerCase() !== deletedCategory.name.toLowerCase()
  || q.ownerEmail !== userEmail);
  saveQuestionsData(filteredQuestions);

  res.json(deletedCategory);
};
  
