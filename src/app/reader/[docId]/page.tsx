import React from 'react';
import { DocumentViewer } from '@/components/DocumentViewer';
import { mockData } from '@/data/mockData';
import { documentStore } from '@/data/store';
import { notFound } from 'next/navigation';

export default async function ReaderPage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = await params;
  
  let doc = undefined;
  
  if (docId === mockData.id) {
    doc = mockData;
  } else {
    doc = documentStore.get(docId);
  }

  if (!doc) {
    notFound();
  }

  return (
    <DocumentViewer 
      title={doc.title}
      markdown={doc.markdown}
    />
  );
}
