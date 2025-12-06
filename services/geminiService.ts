import { GoogleGenAI, Schema } from "@google/genai";
import { GeneratedContent, GeneratorInput } from "../types";

const SYSTEM_PROMPT = `
You are an expert instructional designer and API-focused content generator for grades 1–10. 
Produce a single valid JSON object that contains: a 5-question multiple-choice quiz, adaptive difficulty hints, pedagogical tags, short explanations, distractor rationales, a teacher-editable summary, a kid-friendly Mermaid mind-map, color/icon hints, and a 1-line integration suggestion. 
Keep all language age-appropriate for the requested grade.
`;

export const generateEducationalContent = async (input: GeneratorInput): Promise<GeneratedContent> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Input:
    {
      "grade": ${input.grade},
      "topic": "${input.topic}",
      "language": "${input.language}",
      "difficulty_profile": "${input.difficulty}",
      "seed": ${input.seed || Math.floor(Math.random() * 10000)}
    }

    Output JSON schema (strict). Fill fields exactly as below:
    {
      "metadata": {
        "grade": "integer",
        "topic": "string",
        "language": "string",
        "difficulty_profile": "string",
        "generated_at": "ISO8601 string",
        "model": "string",
        "seed_used": "integer or null"
      },
      "quiz": {
        "adaptive_strategy": "string",
        "questions": [
          {
            "id": "string",
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "answer_index": "integer",
            "difficulty": "string",
            "bloom_level": "string",
            "learning_objective": "string",
            "time_estimate_seconds": "integer",
            "explanation": "string",
            "distractor_rationales": ["string", "string", "string"],
            "hint": "string",
            "follow_up_activity": "string",
            "seed": "integer"
          }
        ]
      },
      "mindmap": {
        "scaffold": ["string"],
        "mermaid": "string (valid mermaid graph LR syntax)",
        "color_hints": { "central": "string", "branch1": "string" },
        "icon_hints": { "central": "string", "branch1": "string" }
      },
      "teacher_notes": {
        "summary": "string",
        "editing_tips": "string",
        "assessment_recommendation": "string"
      },
      "integration_suggestion": "string",
      "safety_checks": ["string"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\n" + prompt }] }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
