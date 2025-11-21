import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, Topic } from "../types";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExplanation = async (question: string, options: string[], correctOption: string, userOption: string): Promise<string> => {
  try {
    const prompt = `
      Actúa como Skily, una IA avanzada de instrucción vial.
      El piloto (alumno) ha respondido a una pregunta de test DGT.
      
      Pregunta: "${question}"
      Opciones: ${JSON.stringify(options)}
      Respuesta Correcta: "${correctOption}"
      Respuesta del Piloto: "${userOption}"

      Proporciona una explicación técnica pero accesible. Sé breve (máximo 3 frases). Usa un tono profesional y motivador ("Atención piloto...", "Correcto, el reglamento indica...").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });

    return response.text || "Datos de explicación no disponibles.";
  } catch (error) {
    console.error("Error fetching explanation:", error);
    return "Error de conexión con la base de datos central.";
  }
};

export const askTutor = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "Eres Skily Knowledge Engine. Tu objetivo es proporcionar definiciones exactas y normas de tráfico DGT (España). NO converses. Si el usuario pregunta 'velocidad autopista', responde: 'Turismos y motocicletas: 120 km/h. Autobuses: 100 km/h.'. Sé extremadamente breve, usa formato Markdown simple. Si la pregunta no es sobre tráfico, di: 'Error: Tema fuera de base de datos vial.'",
      }
    });
    return response.text || "Sin respuesta del núcleo.";
  } catch (error) {
    console.error(error);
    return "Error de conexión: Núcleo IA desconectado.";
  }
};

export const generateQuizQuestion = async (topic: Topic): Promise<Question | null> => {
  try {
    const prompt = `Genera una pregunta de examen de conducir oficial de la DGT (España) sobre el tema: "${topic}".
    La pregunta debe ser desafiante y realista. Incluye 4 opciones, donde solo una es correcta.
    Añade una explicación breve de la normativa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "El texto de la pregunta" },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array de 4 opciones de respuesta" 
            },
            correctIndex: { type: Type.INTEGER, description: "El índice (0-3) de la respuesta correcta" },
            explanation: { type: Type.STRING, description: "Explicación didáctica de la respuesta correcta" },
            topic: { type: Type.STRING, description: "El tema de la pregunta" }
          },
          required: ["text", "options", "correctIndex", "explanation"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        id: Date.now(),
        topic: topic,
        text: data.text,
        options: data.options,
        correctIndex: data.correctIndex,
        explanation: data.explanation,
        imageUrl: undefined // Images would require a separate image generation or stock API
      };
    }
    return null;
  } catch (error) {
    console.error("Error generating question:", error);
    return null;
  }
};