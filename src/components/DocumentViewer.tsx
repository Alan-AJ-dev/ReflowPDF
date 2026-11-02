'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ArrowLeft, List, Moon, Sun, X } from 'lucide-react';

interface DocumentViewerProps {
  title: string;
  markdown: string;
}

export function DocumentViewer({ title, markdown }: DocumentViewerProps) {
  const [fontSize, setFontSize] = useState(17);
  const [darkMode, setDarkMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  const headings = useMemo(() => markdown.split('\n').flatMap((line) => {
    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) return [];
    const text = match[2].replace(/[`*_~]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const id = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
    return [{ text, id, level: match[1].length }];
  }), [markdown]);

  useEffect(() => {
    const handleScroll = () => {
      const root = document.documentElement;
      const distance = root.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(100, Math.max(0, (window.scrollY / distance) * 100)) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className={`reader-shell min-h-screen transition-colors duration-200 ${darkMode ? 'reader-dark' : 'reader-light'}`}
      style={{ '--reader-font-size': `${fontSize}px` } as CSSProperties}
    >
      <div className="reader-progress" style={{ width: `${progress}%` }} />

      <header className="reader-header">
        <Link href="/" className="reader-back" aria-label="Back to ReflowPDF">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>ReflowPDF</span>
        </Link>
        <span className="reader-progress-label">{Math.round(progress)}% read</span>
      </header>

      <main className="reader-main">
        <article>
          <h1 className="reader-title">{title}</h1>
          <MarkdownRenderer content={markdown} />
        </article>
      </main>

      {tocOpen && (
        <>
          <button className="toc-backdrop" aria-label="Close contents" onClick={() => setTocOpen(false)} />
          <nav className="toc-panel" aria-label="Table of contents">
            <div className="toc-heading"><strong>On this page</strong><button onClick={() => setTocOpen(false)} aria-label="Close contents"><X size={18} /></button></div>
            {headings.length ? headings.map((heading, index) => (
              <a key={`${heading.id}-${index}`} href={`#${heading.id}`} className={`toc-link toc-level-${heading.level}`} onClick={() => setTocOpen(false)}>{heading.text}</a>
            )) : <p className="toc-empty">No headings in this document.</p>}
          </nav>
        </>
      )}

      <nav className="reader-toolbar" aria-label="Reading controls">
        <button onClick={() => setTocOpen(true)} aria-label="Open table of contents" title="Contents">
          <List size={20} aria-hidden="true" /><span className="toolbar-label">Contents</span>
        </button>
        <div className="font-controls" aria-label={`Font size ${fontSize} pixels`}>
          <button onClick={() => setFontSize((size) => Math.max(14, size - 1))} aria-label="Decrease text size" disabled={fontSize <= 14}>A−</button>
          <span>{fontSize}</span>
          <button onClick={() => setFontSize((size) => Math.min(23, size + 1))} aria-label="Increase text size" disabled={fontSize >= 23}>A+</button>
        </div>
        <button onClick={() => setDarkMode((mode) => !mode)} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`} title="Toggle theme">
          {darkMode ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}<span className="toolbar-label">Theme</span>
        </button>
      </nav>
    </div>
  );
}
