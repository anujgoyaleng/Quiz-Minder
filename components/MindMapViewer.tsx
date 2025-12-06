import React, { useEffect, useRef } from 'react';

// Declaration to satisfy TS since we load Mermaid via CDN
declare global {
  interface Window {
    mermaid: any;
  }
}

interface MindMapViewerProps {
  chart: string;
  colorHints?: Record<string, string>;
}

export const MindMapViewer: React.FC<MindMapViewerProps> = ({ chart, colorHints }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
            primaryColor: '#e0e7ff', // Indigo 100
            primaryTextColor: '#1e1b4b', // Indigo 950
            primaryBorderColor: '#4338ca', // Indigo 700
            lineColor: '#6366f1', // Indigo 500
            secondaryColor: '#f0f9ff',
            tertiaryColor: '#fff',
        },
        fontFamily: 'Inter' 
      });
    }
  }, []);

  useEffect(() => {
    const renderChart = async () => {
      if (containerRef.current && window.mermaid) {
        try {
          // Clear previous SVG
          containerRef.current.innerHTML = '';
          
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await window.mermaid.render(id, chart);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
            console.error('Mermaid render error:', error);
            if(containerRef.current) {
                containerRef.current.innerHTML = `<div class="text-red-500 p-4 border border-red-200 rounded bg-red-50">Error rendering mind map. Please check syntax.</div>`;
            }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div 
        ref={containerRef} 
        className="w-full overflow-x-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center"
      />
      {colorHints && Object.keys(colorHints).length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
           <span className="font-semibold">Suggested Colors:</span>
           {Object.entries(colorHints).map(([key, val]) => (
               <span key={key} className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                   {key}: {val}
               </span>
           ))}
        </div>
      )}
    </div>
  );
};
