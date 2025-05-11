import express from 'express';
import { getAllCategories, addCategory, deleteCategory } from '../controllers/categoriesController.js';
import validateBody from '../helpers/validateBody.js';
import { categorySchema } from '../schemas/validationSchemas.js';
import catchAsync from '../helpers/catchAsync.js';

const router = express.Router();

router.get(
    '/', 
    catchAsync(getAllCategories));
router.post(
    '/', 
    validateBody(categorySchema), 
    catchAsync(addCategory));
router.delete(
    '/:id', 
    catchAsync (deleteCategory));    

export default router;    