import React from 'react';
import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onTryDemo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="text-center max-w-2xl">
        {/* Logo and Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-4 rounded-2xl shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-4">
            FyuleAI
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Transform Education with AI-Powered Learning
          </p>
          <p className="text-slate-500">
            Create personalized quizzes, mind maps, and learning materials in seconds
          </p>
        </div>

        {/* Try Demo Button */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onTryDemo}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out"
          >
            Try Demo
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-semibold text-slate-800 mb-2">Interactive Quizzes</h3>
            <p className="text-slate-600 text-sm">
              AI-generated questions tailored to any topic and difficulty level
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-semibold text-slate-800 mb-2">Visual Mind Maps</h3>
            <p className="text-slate-600 text-sm">
              Concept diagrams that bring complex topics to life
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-slate-800 mb-2">Smart Notes</h3>
            <p className="text-slate-600 text-sm">
              Key insights and thought-provoking questions included
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-slate-500 text-sm">
        <p>Powered by advanced AI to enhance your learning experience</p>
      </div>
    </div>
  );
};
