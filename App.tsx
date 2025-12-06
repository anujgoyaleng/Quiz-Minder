import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GeneratorInput, GeneratedContent } from './types';
import { generateEducationalContent } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { QuizCard } from './components/QuizCard';
import { MindMapViewer } from './components/MindMapViewer';
import { Notes } from './components/Notes';
import { LandingPage } from './components/LandingPage';
import { LayoutDashboard, BrainCircuit, GraduationCap, AlertCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState<GeneratorInput>({
    grade: 5,
    topic: 'The Solar System',
    language: 'English',
    difficulty: 'mixed'
  });
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'quiz' | 'mindmap' | 'notes'>('quiz');
  const [showLanding, setShowLanding] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateEducationalContent(input);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {showLanding && (
        <LandingPage onTryDemo={() => setShowLanding(false)} />
      )}
      
      {!showLanding && (
      <div>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                    FyuleAI
                </h1>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Inputs */}
            <div className="lg:col-span-3">
                <InputForm 
                    input={input} 
                    onChange={setInput} 
                    onSubmit={handleGenerate} 
                    isLoading={loading} 
                />
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-9">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-red-800">Generation Error</h3>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {!data && !loading && !error && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        <Sparkles className="w-16 h-16 mb-4 text-slate-200" />
                        <p className="text-lg font-medium">Ready to design your curriculum.</p>
                        <p className="text-sm">Enter your topic on the left to begin.</p>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-600 font-medium animate-pulse">Please wait...</p>
                        <p className="text-slate-400 text-sm mt-1">Generating quizzes, logic maps, and notes.</p>
                    </div>
                )}

                {data && !loading && (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('quiz')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
                                    ${activeTab === 'quiz' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                                `}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Interactive Quiz
                            </button>
                            <button
                                onClick={() => setActiveTab('mindmap')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
                                    ${activeTab === 'mindmap' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                                `}
                            >
                                <BrainCircuit className="w-4 h-4" />
                                Mind Map
                            </button>
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
                                    ${activeTab === 'notes' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                                `}
                            >
                                <GraduationCap className="w-4 h-4" />
                                Notes
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 bg-slate-50/50 min-h-[500px]">
                            {activeTab === 'quiz' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-slate-800">{data.metadata.topic}</h2>
                                        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                                            Adaptive Strategy: {data.quiz.adaptive_strategy}
                                        </span>
                                    </div>
                                    <div className="grid gap-6">
                                        {data.quiz.questions.map((q, idx) => (
                                            <QuizCard key={q.id} question={q} index={idx} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'mindmap' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Concept Map</h2>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {data.mindmap.scaffold.map((step, i) => (
                                                <div key={i} className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                                                    <span className="font-bold mr-1">{i+1}.</span> {step}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <MindMapViewer 
                                        chart={data.mindmap.mermaid} 
                                        colorHints={data.mindmap.color_hints} 
                                    />
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <Notes data={data} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </main>
      </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
