import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error('API_KEY is not defined in the environment variables');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    res.send('Hello World');
});

app.post('/chatgpt', async (req, res) => {
    const userInput = req.body.input;

    if (!userInput) {
        return res.status(400).send('No Input Provided');
    }

    try {
        console.log('Generating content for input:', userInput);

        
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-pro'
        });

        
        const result = await model.generateContent(userInput);

        
        const text = result.response.candidates[0].content;

        console.log('Generated text:', text);

        res.json({ response: text });
    } catch (error) {
        console.error('Error generating content:', error);
        if (!res.headersSent) {
            res.status(500).send('Error Generating Content');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

