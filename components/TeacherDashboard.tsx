import React from 'react';
import { GeneratedContent } from '../types';
import { BookOpen, FileJson, AlertTriangle, Lightbulb } from 'lucide-react';

interface TeacherDashboardProps {
  data: GeneratedContent;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        {/* Safety Checks */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-800 font-semibold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Safety & Compliance
            </h4>
            <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                {data.safety_checks.map((check, i) => (
                    <li key={i}>{check}</li>
                ))}
            </ul>
        </div>

        {/* Integration */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Integration Strategy
            </h3>
            <p className="text-slate-600 italic border-l-4 border-yellow-300 pl-4 py-1 bg-yellow-50/50 rounded-r">
                "{data.integration_suggestion}"
            </p>
        </div>

        {/* Notes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Teacher Guide
            </h3>
            
            <div className="space-y-4">
                <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Summary</span>
                    <p className="text-slate-700 mt-1">{data.teacher_notes.summary}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Editing Tip</span>
                        <p className="text-slate-700 mt-1 text-sm">{data.teacher_notes.editing_tips}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Next Step</span>
                        <p className="text-slate-700 mt-1 text-sm">{data.teacher_notes.assessment_recommendation}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Raw JSON */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                <span className="text-slate-300 text-xs font-mono flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    RAW OUTPUT
                </span>
                <span className="text-slate-500 text-xs">ReadOnly</span>
            </div>
            <pre className="p-4 text-xs text-indigo-300 overflow-x-auto font-mono max-h-64 scrollbar-thin scrollbar-thumb-slate-700">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    </div>
  );
};
