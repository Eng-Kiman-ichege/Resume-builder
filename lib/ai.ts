export async function chatCompletion(messages: any[], isJson = false) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not defined");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "CV Craft",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: messages,
      max_tokens: 4000,
      // Disable JSON mode for free models as it's often unsupported
      // ...(isJson && { response_format: { type: "json_object" } }),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("OpenRouter Error Details:", JSON.stringify(errorData, null, 2));
    
    const message = errorData.error?.message || "Failed to fetch from OpenRouter";
    
    if (response.status === 402) {
      const creditError = new Error(`INSUFFICIENT_CREDITS: Your OpenRouter account has run out of credits. Please top up at https://openrouter.ai/settings/credits`);
      (creditError as any).status = 402;
      throw creditError;
    }
    
    const error = new Error(message);
    (error as any).status = response.status;
    throw error;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  if (!content) {
    console.error("OpenRouter returned an empty content field. Full response:", JSON.stringify(data, null, 2));
  }

  return content;
}

export async function generateResumeSuggestions(section: string, data: any) {
  try {
    const content = await chatCompletion([
      {
        role: "system",
        content:
          "You are a professional resume writer and ATS optimization expert. You must ALWAYS provide constructive criticism and actionable improvements. NEVER say 'no suggestion', 'looks good', or similar phrases. Always find ways to make the content stronger, more action-oriented, and quantifiable.",
      },
      {
        role: "user",
        content:
          section === "full_resume"
            ? `Please review the entire resume data and provide a comprehensive critique. Give 3-5 high-impact suggestions to improve the overall resume (e.g. formatting, missing information, impactful action verbs, ATS optimization). Here is the data: ${JSON.stringify(data)}`
            : `Section: ${section}\nData: ${JSON.stringify(data)}\nPlease provide 3-5 professional bullet point suggestions or a polished summary to improve this specific section.`,
      },
    ]);

    return content;
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    return null;
  }
}

export async function generateJobDescription(jobTitle: string, employer: string) {
  try {
    const content = await chatCompletion([
      {
        role: "system",
        content:
          "You are a professional resume writer. Your task is to generate a highly professional, action-oriented job description consisting of 3 to 4 bullet points. Use strong action verbs, quantifiable metrics where possible, and focus on achievements rather than just duties. Do not include any introductory or concluding text, only the bullet points.",
      },
      {
        role: "user",
        content: `Please generate a resume job description for the following role:\nJob Title: ${jobTitle}\nEmployer: ${employer}\n\nReturn ONLY the bullet points separated by newlines, for example:\n• Led a team of... \n• Developed new... \n• Increased sales by...`,
      },
    ]);

    return content;
  } catch (error) {
    console.error("Error generating job description:", error);
    return null;
  }
}

export async function generateAutoReview(data: any) {
  try {
    const content = await chatCompletion([
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

Only suggest changes for the "summary", "skills", and "experience" sections. Do not suggest changes for dates, names, or locations. Keep suggestions highly impactful, adding strong action verbs and quantifying achievements.`,
      },
      {
        role: "user",
        content: `Review this resume data and generate specific, actionable improvements in the requested JSON format:\n\n${JSON.stringify({
          summary: data.summary,
          skills: data.skills,
          experience: data.experience,
        })}`,
      },
    ], true);

    let cleanContent = content || "{}";

    // Clean up potential markdown blocks if the model ignored instructions
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    return JSON.parse(cleanContent);
  } catch (error) {
    console.error("Error generating auto review:", error);
    return null;
  }
}

export async function generateCoverLetter(
  jobTitle: string,
  company: string,
  resumeData: any
) {
  try {
    const content = await chatCompletion([
      {
        role: "system",
        content:
          "You are a professional cover letter writer. Your task is to write a compelling, tailored cover letter. Keep it under 300 words. Focus on how the candidate's experience matches the role. Output ONLY the body of the letter (no headers or signatures).",
      },
      {
        role: "user",
        content: `Write a cover letter body for a ${jobTitle} position at ${company}. 
          Candidate Name: ${resumeData.header?.firstName} ${resumeData.header?.lastName}
          Experience: ${JSON.stringify(resumeData.experience)}
          Skills: ${resumeData.skills?.content}`,
      },
    ]);

    return content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return null;
  }
}

export async function generateOptimizedResume(
  cvText: string,
  jobDescription: string
) {
  try {
    const content = await chatCompletion([
      {
        role: "system",
        content: `You are an expert ATS resume optimizer. Your task is to take a raw CV text and a job description, then generate a perfectly tailored, structured resume.

Rules:
1. CRITICAL: Extract ALL information from the CV text. Do not omit any education, experience, or skills.
2. TAILORING: Once extracted, rewrite the "summary", "experience", and "skills" descriptions to align 100% with the provided job description. Use industry-standard keywords found in the job description.
3. STRUCTURE: Ensure the education section is complete with school name, degree, and dates.
4. REVIEW: Provide a detailed explanation of changes in the "optimizationReview" field.
5. FORMAT: Your output MUST be ONLY a valid JSON object matching the schema below. NO markdown formatting, NO explanation.

Schema:
{
  "header": {
    "firstName": "string",
    "surname": "string",
    "email": "string",
    "phone": "string",
    "city": "string",
    "country": "string",
    "postalCode": "string",
    "profileLabel": "string",
    "profileLink": "string"
  },
  "summary": { "content": "string" },
  "experience": [
    {
      "jobTitle": "string",
      "employer": "string",
      "city": "string",
      "country": "string",
      "startYear": "string",
      "endYear": "string",
      "description": "string (bullet points separated by newlines)"
    }
  ],
  "education": [
    {
      "institution": "string",
      "location": "string",
      "degree": "string",
      "field": "string",
      "gradYear": "string",
      "description": "string"
    }
  ],
  "skills": { "content": "string (comma separated list)" },
  "additional": [
    {
      "title": "string",
      "content": "string"
    }
  ],
  "settings": {
    "color": "#3b82f6",
    "titleColor": "#0f172a",
    "backgroundColor": "#ffffff",
    "templateId": "modern-classic"
  },
  "optimizationReview": "A detailed 2-3 paragraph explanation of what you changed in the CV to align it with the job description."
}`,
      },
      {
        role: "user",
        content: `CV Text: ${cvText}\n\nJob Description: ${jobDescription}`,
      },
    ], true);

    let cleanContent = content || "{}";

    // Clean up potential markdown blocks
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    return JSON.parse(cleanContent);
  } catch (error: any) {
    console.error("Error generating optimized resume:", error);
    // Rethrow so the route can return a meaningful HTTP status/message to the client
    throw error;
  }
}
