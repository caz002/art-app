import { GoogleGenAI } from "@google/genai";

function getCategory() {
    const r = Math.random();
    if (r < 0.1) return "Everyday life";
    if (r < 0.2) return "Fantasy";
    if (r < 0.3) return "Nature & outdoors";
    if (r < 0.4) return "Cozy scenes";
    if (r < 0.5) return "Animals & pets";
    if (r < 0.6) return "Food & drink";
    if (r < 0.7) return "Travel & places";
    if (r < 0.8) return "Seasonal & weather";
    if (r < 0.9) return "Objects & still life";
    return "Whimsical twists";
}

export async function generatePrompt() {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const category = getCategory();

    const prompt = `
            You are a creative assistant that only writes short drawing prompts.  
            The drawing prompt should take 10–30 minutes to sketch.  
            It should not be abstract. Don't go overboard with descriptions. Keep it almost simple.
            Category: ${category}  
            The random number is ${Math.random()}.
            Give me one short drawing prompt.
        `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return {
        text: response.text,
        category,
    };
}
