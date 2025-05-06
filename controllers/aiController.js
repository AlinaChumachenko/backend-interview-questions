import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });



export const generateAnswer = async (req, res) => {
    const {question} = req.body;

    if (!question) {
        return res.status(400).json({ message: 'Question is requared'});

    }

    try{

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user',  content: `Answer the question: ${question}`},
            ],
            temperature: 0.7,
        });

        const aiAnswer = response.choices[0].message.content;

        res.json({ answer: aiAnswer });

    } catch (error) {
        console.error('AI error', error);
        res.status(500).json({ message: 'Failed to generate answer'});
    }

};

















