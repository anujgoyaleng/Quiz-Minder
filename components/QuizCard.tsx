import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Lightbulb, Clock, Target } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, index }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selectedOption === question.answer_index;
  const hasAnswered = selectedOption !== null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header Tags */}
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex flex-wrap gap-3 items-center text-xs text-slate-600 font-medium">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            Q{index + 1}
        </span>
        <span className={`px-2 py-0.5 rounded-full capitalize ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
        }`}>
            {question.difficulty}
        </span>
        <span className="flex items-center gap-1">
            <Target className="w-3 h-3" /> {question.bloom_level}
        </span>
        <span className="flex items-center gap-1 ml-auto">
            <Clock className="w-3 h-3" /> {question.time_estimate_seconds}s
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !hasAnswered && setSelectedOption(i)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 relative
                ${hasAnswered && i === question.answer_index 
                    ? 'border-green-500 bg-green-50 text-green-800' 
                    : hasAnswered && i === selectedOption && i !== question.answer_index
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : hasAnswered
                    ? 'border-slate-100 bg-slate-50 opacity-50'
                    : selectedOption === i 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{opt}</span>
                {hasAnswered && i === question.answer_index && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {hasAnswered && i === selectedOption && i !== question.answer_index && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          ))}
        </div>

        {/* Post Answer Feedback */}
        {hasAnswered && (
          <div className={`mt-4 p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
             <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
             <p>{question.explanation}</p>
             {!isCorrect && question.distractor_rationales && (
                <p className="mt-2 text-xs opacity-90 italic">
                    Hint: {question.distractor_rationales[Math.max(0, (selectedOption || 0) - (selectedOption! > question.answer_index ? 1 : 0))]}
                </p>
             )}
          </div>
        )}

        {/* Hint System */}
        {!hasAnswered && (
            <div className="flex justify-end">
                <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                >
                    <Lightbulb className="w-3 h-3" />
                    {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>
            </div>
        )}
        {showHint && !hasAnswered && (
            <div className="mt-2 p-3 bg-amber-50 text-amber-800 text-sm rounded border border-amber-200 italic">
                {question.hint}
            </div>
        )}
      </div>
      
      {/* Learning Objective Footer */}
      <div className="bg-slate-50 px-6 py-2 border-t border-slate-100 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
        Objective: {question.learning_objective}
      </div>
    </div>
  );
};
