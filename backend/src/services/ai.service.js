import { configDotenv } from "dotenv";
configDotenv();
async function generateContent(prompt) {
  if (!prompt) {
    console.error("Error: Prompt is undefined. Please provide a prompt.");
    return null;
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai"); // 👈 Dynamic import
    const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: ` You are a senior code reviewer with expert-level development experience. Your role is to review code carefully, identify problems, and suggest best-practice solutions.

You focus on:
- Code quality, readability, and performance
- Clean architecture and maintainable structure
- Industry standards and professional coding conventions

Your feedback should:
- Be short but explained in multiple clear lines
- Describe what’s wrong, why it matters, and how to fix it
- Provide clean, structured examples that are easy to understand

Your goal is to help developers improve their code for both personal and production-level use, with clarity, efficiency, and maintainability.

Review the user's code carefully.

Highlight bugs or bad practices clearly using ❌ and explain why.

Suggest clean, readable, and correct code using ✅.

Keep explanations brief, in multiple clear lines.

Always return fixed, ready-to-use code after suggestions.

Make it easy for the user to understand and improve.
`,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}

export default generateContent;
