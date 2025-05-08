import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const questionSchema = Joi.object({
  question: Joi.string().min(5).required(),
  category: Joi.string().required()
});

export const answerSchema = Joi.object({
  answer: Joi.string().min(2).required()
});

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
});