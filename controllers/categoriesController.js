import { getCategories, saveCategories } from '../utils/fileStorage.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllCategories = (req, res) => {
  const categories = getCategories();
  res.json(categories);
};

export const addCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const categories = getCategories();

  const exists = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'Category already exists' });
  }

  const newCategory = {
    id: uuidv4(),
    name
  };

  categories.push(newCategory);
  saveCategories(categories);

  res.status(201).json(newCategory);
};

export const deleteCategory = (req, res) => {
    const { name } = req.params;
    let categories = getCategories();
  
    const index = categories.findIndex(cat => cat.name.toLowerCase() === name.toLowerCase());
  
    if (index === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }
  
    const deleted = categories.splice(index, 1);
    saveCategories(categories);
  
    res.json(deleted[0]);
  };
  
