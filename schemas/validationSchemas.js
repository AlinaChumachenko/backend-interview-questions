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
  question_en: Joi.string().min(2).optional().empty(''),
  question_uk: Joi.string().min(2).optional().empty(''),
  category: Joi.string().required()
}).or('question_en', 'question_uk');

export const answerSchema = Joi.object({
  answer_en: Joi.string().min(2).allow('').optional(),
  answer_uk: Joi.string().min(2).allow('').optional(),
  answer: Joi.string().min(1).optional(),
  lang: Joi.string().valid('en', 'uk').required()
}).or('answer_en', 'answer_uk', 'answer');

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
});