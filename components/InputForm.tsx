import React from 'react';
import { GeneratorInput } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';

interface InputFormProps {
  input: GeneratorInput;
  onChange: (input: GeneratorInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  const handleChange = (field: keyof GeneratorInput, value: any) => {
    onChange({ ...input, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/60 backdrop-blur-sm sticky top-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Config
        </h2>
        <p className="text-sm text-slate-500">Define your curriculum needs</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Grade Level (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={input.grade}
            onChange={(e) => handleChange('grade', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Topic
          </label>
          <input
            type="text"
            placeholder="e.g. Photosynthesis"
            value={input.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Language
          </label>
          <select
            value={input.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin">Mandarin</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Difficulty
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['easy', 'medium', 'hard', 'mixed'].map((diff) => (
              <button
                key={diff}
                onClick={() => handleChange('difficulty', diff)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all
                  ${input.difficulty === diff 
                    ? 'bg-indigo-100 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !input.topic}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold shadow-md shadow-indigo-200 transition-all flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Designing...
            </>
          ) : (
            'Generate Content'
          )}
        </button>
      </div>
    </div>
  );
};
