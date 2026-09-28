import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none text-[#e6e6e6] prose-headings:text-white prose-a:text-blue-400 prose-blockquote:border-l-4 prose-blockquote:border-gray-500 prose-blockquote:bg-[#202020] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          img: ({ node, ...props }) => (
            <div className="flex justify-center my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...props}
                className="max-w-full h-auto rounded-lg shadow-lg"
                alt={props.alt || 'Document Image'}
              />
            </div>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote {...props} className="my-4" />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="w-full text-left border-collapse" />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th {...props} className="border-b border-gray-600 p-2 text-gray-300" />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="border-b border-gray-700 p-2" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
