export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer_index: number;
  difficulty: 'easy' | 'medium' | 'hard';
  bloom_level: string;
  learning_objective: string;
  time_estimate_seconds: number;
  explanation: string;
  distractor_rationales: string[];
  hint: string;
  follow_up_activity?: string;
  seed?: number;
}

export interface MindMapData {
  scaffold: string[];
  mermaid: string;
  color_hints: Record<string, string>;
  icon_hints: Record<string, string>;
}

export interface TeacherNotes {
  summary: string;
  editing_tips: string;
  assessment_recommendation: string;
}

export interface GeneratedContent {
  metadata: {
    grade: number;
    topic: string;
    language: string;
    difficulty_profile: string;
    generated_at: string;
    model: string;
    seed_used: number | null;
  };
  quiz: {
    adaptive_strategy: string;
    questions: QuizQuestion[];
  };
  mindmap: MindMapData;
  teacher_notes: TeacherNotes;
  integration_suggestion: string;
  safety_checks: string[];
}

export interface GeneratorInput {
  grade: number;
  topic: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  seed?: number;
}
