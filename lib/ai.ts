import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter rankings
    "X-Title": "CV Craft", // Optional, for OpenRouter rankings
  }
});

export async function generateResumeSuggestions(section: string, data: any) {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "nvidia/nemotron-4-340b-instruct",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer and ATS optimization expert. Provide helpful suggestions, tips, or fixes for the given resume section."
        },
        {
          role: "user",
          content: `Section: ${section}\nData: ${JSON.stringify(data)}\nPlease provide 3-5 professional bullet point suggestions or a polished summary for this section.`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    return null;
  }
}
