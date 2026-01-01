import { createRequire } from "module";
import fs from 'fs';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { Groq } from 'groq-sdk';

export const convertPDF = async (req, res) => {    
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
    try {
        if (!req.files) {
            return res.status(500).json({message: "No file uploaded."})
        }


        for (const file of req.files) {
            
            let dataBuffer = fs.readFileSync(file.path)

            const pdfData = await pdfParse(dataBuffer);
            const docling = new Docling();
    const parsedOutput = await docling.parse(pdfData.text);

            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    {
                    "role": "user",
                    "content": `
                        You are a data extraction AI. 
                        Your task is to convert the following document text into flashcards. 
                        Each flashcard must be a JSON object with this shape:

                        {
                        "id": "<unique id>",
                        "term": "<the main concept or keyword>",
                        "definition": "<the explanation of that concept>"
                        }

                        Rules:
                        - Output ONLY a valid JSON array, nothing else (no text outside JSON).
                        - Do not invent new content, only use the text provided.
                        - Clean up duplicate or noisy lines like "*Property".
                        - Keep definitions short but accurate.
                        - If a term has multiple bullet points, combine them into a single definition.

                        Here is the document text:

                        ${pdfData.text}
                        `
                    }
                ],
                "model": "gemma2-9b-it",
                "temperature": 1,
                "max_completion_tokens": 1024,
                "top_p": 1,
                "stream": false,
                "stop": null
                });

                const aiText = chatCompletion.choices[0]?.message?.content?.trim();
                console.log("AI Response for", file.originalname, ":\n", aiText);

                fs.unlinkSync(file.path);
        }

    } catch (error) {
        
    }
}