import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
}

function headingId(children: React.ReactNode) {
  const getText = (node: React.ReactNode): string => React.Children.toArray(node).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (React.isValidElement<{ children?: React.ReactNode }>(child)) return getText(child.props.children);
    return '';
  }).join('');
  const text = getText(children);
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="document-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node: _node, children, ...props }) => <h2 id={headingId(children)} {...props}>{children}</h2>,
          h2: ({ node: _node, children, ...props }) => <h2 id={headingId(children)} {...props}>{children}</h2>,
          h3: ({ node: _node, children, ...props }) => <h3 id={headingId(children)} {...props}>{children}</h3>,
          img: ({ node: _node, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img {...props} className="document-image" alt={props.alt || 'Document figure'} loading="lazy" />
          ),
          blockquote: ({ node: _node, children, ...props }) => <blockquote {...props}>{children}</blockquote>,
          table: ({ node: _node, children, ...props }) => (
            <div className="document-table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}>
              <table {...props}>{children}</table>
            </div>
          ),
          th: ({ node: _node, children, ...props }) => <th {...props}>{children}</th>,
          td: ({ node: _node, children, ...props }) => <td {...props}>{children}</td>,
          pre: ({ node: _node, children, ...props }) => <pre {...props}>{children}</pre>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
