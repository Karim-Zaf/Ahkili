
import { NextResponse } from "next/server";



import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  GoogleGenerativeAI
const apiKey : any= process.env.OPENAI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

export async function GET(request: Request, {params}: any) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams)

    const description : any = searchParams.get('description');

    
    const chatSession = model.startChat({
        generationConfig,
     // safetySettings: Adjust safety settings
     // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
      });
    
      const result = await chatSession.sendMessage(description);
    
    
    return NextResponse.json({output:result.response.text()});
}
