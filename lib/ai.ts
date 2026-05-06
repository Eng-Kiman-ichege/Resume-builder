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
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer and ATS optimization expert. You must ALWAYS provide constructive criticism and actionable improvements. NEVER say 'no suggestion', 'looks good', or similar phrases. Always find ways to make the content stronger, more action-oriented, and quantifiable."
        },
        {
          role: "user",
          content: section === "full_resume" 
            ? `Please review the entire resume data and provide a comprehensive critique. Give 3-5 high-impact suggestions to improve the overall resume (e.g. formatting, missing information, impactful action verbs, ATS optimization). Here is the data: ${JSON.stringify(data)}`
            : `Section: ${section}\nData: ${JSON.stringify(data)}\nPlease provide 3-5 professional bullet point suggestions or a polished summary to improve this specific section.`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    return null;
  }
}

export async function generateJobDescription(jobTitle: string, employer: string) {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Your task is to generate a highly professional, action-oriented job description consisting of 3 to 4 bullet points. Use strong action verbs, quantifiable metrics where possible, and focus on achievements rather than just duties. Do not include any introductory or concluding text, only the bullet points."
        },
        {
          role: "user",
          content: `Please generate a resume job description for the following role:\nJob Title: ${jobTitle}\nEmployer: ${employer}\n\nReturn ONLY the bullet points separated by newlines, for example:\n• Led a team of... \n• Developed new... \n• Increased sales by...`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating job description:", error);
    return null;
  }
}

export async function generateAutoReview(data: any) {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an expert ATS resume reviewer. 
Your ONLY output must be valid JSON matching the following schema. DO NOT wrap the output in markdown blocks (\`\`\`json) or include any conversational text.

{
  "suggestions": [
    {
      "section": "summary",
      "reason": "Explain why this change improves the resume",
      "proposedContent": "The exact improved text to replace the old content with."
    },
    {
      "section": "experience",
      "index": 0,
      "field": "description",
      "reason": "Explain the improvement",
      "proposedContent": "The complete rewritten bullet points."
    }
  ]
}

Only suggest changes for the "summary", "skills", and "experience" sections. Do not suggest changes for dates, names, or locations. Keep suggestions highly impactful, adding strong action verbs and quantifying achievements.`
        },
        {
          role: "user",
          content: `Review this resume data and generate specific, actionable improvements in the requested JSON format:\n\n${JSON.stringify({
            summary: data.summary,
            skills: data.skills,
            experience: data.experience
          })}`
        }
      ],
      response_format: { type: "json_object" }
    });

    let content = response.choices[0].message.content || "{}";
    
    // Clean up potential markdown blocks if the model ignored instructions
    if (content.startsWith("```json")) {
      content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (content.startsWith("```")) {
      content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating auto review:", error);
    return null;
  }
}
