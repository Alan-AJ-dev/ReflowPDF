import React from 'react';
import { DocumentViewer } from '@/components/DocumentViewer';
import { mockData } from '@/data/mockData';
import { notFound } from 'next/navigation';

export default function ReaderPage({ params }: { params: { docId: string } }) {
  // In a real app, you would fetch the parsed Markdown content based on the docId
  // For demonstration, we fall back to our mock data if the ID matches, or show it anyway.
  
  if (!params.docId) {
    notFound();
  }

  return (
    <DocumentViewer 
      title={mockData.title}
      markdown={mockData.markdown}
    />
  );
}
