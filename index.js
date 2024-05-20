import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generativeai";


const app = express();
// const openai = new OpenAI();
const genAI = new GoogleGenerativeAI(apiKey);

app.use(cors());
app.use(express.json());





app.post("/", async (req, res) => { 
    res.send('Hello World')
     });




app.get("/chatgpt", (req, res) => {
        console.log(req.body.input)

    async function main() {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            prompt : req.body.input

        });
    
    
    console.log(req.body.input)
    console.log(image.data)
    // res.send(image.data)

    const prompt = req.body.input;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text()
    res.send(text)
    }
    main()
});




app.listen(3000, () => {
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








