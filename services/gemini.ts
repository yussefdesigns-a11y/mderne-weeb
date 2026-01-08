
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStyleAdvice(userInput: string, products: any[]): Promise<string> {
  const productContext = products.map(p => `${p.name} ($${p.price}) - ${p.description}`).join('\n');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert AI Stylist for 'MODERN-STITCH', a premium fashion brand. 
      Your goal is to provide fashion advice and recommend products from our catalog based on the user's needs.
      
      Our Catalog:
      ${productContext}
      
      User Request: "${userInput}"
      
      Provide a helpful, stylish, and concise response. Recommend 1-2 specific products if they fit the request.`,
      config: {
        systemInstruction: "You are a professional fashion stylist. Be trendy, helpful, and concise.",
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a style tip right now. Let's try again!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our stylist is currently out of the office. Please try again in a moment!";
  }
}

export async function visualizeInScene(base64Image: string, place: string, productName: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `Place this product, the "${productName}", into a high-end, realistic "${place}" setting. 
            Maintain the exact details, fabric texture, and fit of the clothing. 
            The lighting should perfectly match the environment. Cinematic fashion photography style.`,
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Scene Visualizer Error:", error);
    return null;
  }
}
