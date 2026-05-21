import dotenv from "dotenv"
dotenv.config()
import type { Request, Response } from "express"
import openai from "openai"

const client = new openai.OpenAI({
    apiKey: process.env.GROQ_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});


export const translate = async (req: Request, res: Response) => {
    const { text, toGenz } = req.body
    if (!text || typeof text !== "string" || typeof toGenz !== "boolean") {
        return res.status(400).json({ error: "Invalid input" })
    }

    const prompt = toGenz
        ? `Translate the following text to Gen Z slang , do not add any things to evidentiate the words and use words like Delulu, Rizz, skibidi, Gyatt, fannum tax, aura, ohio, alpha, sigma, goofy ahh, npc, no cap and main character energy:\n\n${text}`
        : `Translate the following Gen Z slang to standard English dont use any Gen Z slang and i say do not use slangs like theese: like Delulu, Rizz, skibidi, Gyatt, fannum tax, aura, ohio, alpha, sigma, goofy ahh, npc, no cap and main character energy :\n\n${text}`

    const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: prompt
    });
    
    return res.json({ translation: response.output_text })   
}