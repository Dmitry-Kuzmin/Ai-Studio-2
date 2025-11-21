import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, Topic } from "../types";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExplanation = async (question: string, options: string[], correctOption: string, userOption: string): Promise<string> => {
  try {
    const prompt = `
      Actúa como un profesor experto de autoescuela en España.
      El alumno ha respondido a una pregunta de test de la DGT.
      
      Pregunta: "${question}"
      Opciones: ${JSON.stringify(options)}
      Respuesta Correcta: "${correctOption}"
      Respuesta del Alumno: "${userOption}"

      Proporciona una explicación breve, amable pero rigurosa (máximo 3 frases) de por qué la respuesta correcta es la que es, y por qué la del alumno es incorrecta (si falló). Cita la normativa general si aplica.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });

    return response.text || "No se pudo generar una explicación en este momento.";
  } catch (error) {
    console.error("Error fetching explanation:", error);
    return "Lo siento, el profesor virtual no está disponible ahora mismo.";
  }
};

export const askTutor = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "Eres un profesor de autoescuela español experto en el Reglamento General de Circulación. Responde de forma didáctica, usando ejemplos claros. Si te preguntan algo fuera del contexto de conducir o tráfico, indica amablemente que solo respondes dudas de vialidad.",
      }
    });
    return response.text || "Sin respuesta.";
  } catch (error) {
    console.error(error);
    return "Error de conexión con el tutor.";
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