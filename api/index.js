// import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";


const app = express();
// const openai = new OpenAI();
const genAI = new GoogleGenerativeAI(process.env.api_Key);


const PORT = process.env.PORT || 3000

dotenv.config();



app.use(cors());
app.use(express.json());


app.post("/", async (req, res) => { 
    res.send('Hello World')
     });


app.post("/chatgpt", async (req, res) => {

    const userInput = req.body.input
        console.log(req.body.input)

    if(!userInput) {
      return res.status(400).send('No Input Provided');
    }
    
    try{
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            prompt : req.body.input

        });
        const result = await model.generateContent(userInput);
        const text = result.text;

        res.json({ response: text });
    } catch (error) {
        console.error('Error generating content:', error);
        if (!res.headersSent) {
            res.status(500).send('Error Generating Content');
        }
    }
});

//         const result = await model.generateContent(userInput);
//         const response = await result.response;
//         const text = response.text()
//         res.send(text)
//     } catch{
//         res.send(500).send('Error Generating Content')
//     }
    
// });




app.listen(PORT, () => {
    console.log("Server is running on port 3000") 
})



    // // const completion = await openai.chat.completions.create({
    // //     messages: [{ 
    // //     role: "system",
    // //     content: "You are a helpful assistant." }],
    // //     model: "gpt-3.5-turbo",
    // //   });

    // const prompt = req.body.input;

    // const result = await 








