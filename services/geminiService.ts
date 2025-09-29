import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function fetchTymbarkText(): Promise<string> {
  try {
    const prompt = `Podaj krótki, losowy, inspirujący lub zabawny tekst, jaki można znaleźć pod kapslem Tymbark. Tekst powinien być w języku polskim i mieć maksymalnie 6 słów. Odpowiedz tylko samym tekstem, bez żadnych dodatkowych zdań, cudzysłowów czy formatowania. Przykłady: "Miłego dnia!", "Kto pyta, nie błądzi.", "Uśmiechnij się :)".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Disable thinking for faster responses for this simple task
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 1.0, // Increase creativity
      },
    });

    const text = response.text.trim();
    // Simple sanitization to remove potential quotes
    return text.replace(/["']/g, '');

  } catch (error) {
    console.error("Error fetching text from Gemini API:", error);
    // Provide a user-friendly error message
    return "Coś poszło nie tak. Spróbuj ponownie!";
  }
}
