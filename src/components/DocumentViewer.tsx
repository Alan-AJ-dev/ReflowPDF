'use client';

import React, { useState, useEffect } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Settings, List, Moon, Sun, PanelRightClose } from 'lucide-react';

interface DocumentViewerProps {
  title: string;
  markdown: string;
}

export function DocumentViewer({ title, markdown }: DocumentViewerProps) {
  const [fontSize, setFontSize] = useState<number>(16);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressPercent = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progressPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#191919] text-[#e6e6e6]' : 'bg-white text-gray-900'}`}
      style={{ fontSize: \`\${fontSize}px\` }}
    >
      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <h1 className={`text-4xl font-bold mb-8 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h1>
        <MarkdownRenderer content={markdown} />
      </main>

      {/* Sticky Bottom Toolbar */}
      <div className={`fixed bottom-0 left-0 right-0 border-t flex items-center justify-around p-4 backdrop-blur-md z-40 ${darkMode ? 'border-gray-800 bg-[#191919]/80 text-gray-300' : 'border-gray-200 bg-white/80 text-gray-700'}`}>
        <button className="p-2 rounded-full hover:bg-gray-800/50 hover:text-white transition-colors" title="Table of Contents">
          <List size={24} />
        </button>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            className="font-bold text-lg p-2 rounded hover:bg-gray-800/50 hover:text-white transition-colors"
            title="Decrease Font Size"
          >
            A-
          </button>
          <span className="text-sm font-medium w-10 text-center">{fontSize}px</span>
          <button 
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            className="font-bold text-lg p-2 rounded hover:bg-gray-800/50 hover:text-white transition-colors"
            title="Increase Font Size"
          >
            A+
          </button>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full hover:bg-gray-800/50 hover:text-white transition-colors" 
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-800/50 hover:text-white transition-colors" title="Original PDF View">
          <PanelRightClose size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-150 ease-out"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}
