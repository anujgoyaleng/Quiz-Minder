import React from 'react';
import { GeneratedContent } from '../types';
import { BookOpen, Lightbulb, Brain } from 'lucide-react';

interface NotesProps {
  data: GeneratedContent;
}

export const Notes: React.FC<NotesProps> = ({ data }) => {
  // Extract thought-provoking questions from the content
  // These could be inferred from the topic and learning objectives
  const generateThoughtQuestions = () => {
    const questions = [
      `How does ${data.metadata.topic.toLowerCase()} affect your daily life?`,
      `Can you think of real-world examples of ${data.metadata.topic.toLowerCase()}?`,
      `What would happen if ${data.metadata.topic.toLowerCase()} didn't exist?`,
      `How could you teach ${data.metadata.topic.toLowerCase()} to someone younger?`,
      `What's the most interesting aspect of ${data.metadata.topic.toLowerCase()} to you?`,
    ];
    return questions.slice(0, 3);
  };

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Topic Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">
                {data.metadata.topic}
            </h2>
            <p className="text-indigo-700 text-sm">Grade {data.metadata.grade} • {data.metadata.language}</p>
        </div>

        {/* Learning Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Summary
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
                {data.teacher_notes.summary}
            </p>
        </div>

        {/* Key Points */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Key Points
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-slate-700 leading-relaxed">
                    {data.teacher_notes.editing_tips}
                </p>
            </div>
        </div>

        {/* Thought-Provoking Questions */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Explore Further
            </h3>
            <div className="space-y-3">
                {generateThoughtQuestions().map((question, index) => (
                    <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="text-slate-700 text-sm">
                            <span className="font-semibold text-purple-700">Q{index + 1}:</span> {question}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
