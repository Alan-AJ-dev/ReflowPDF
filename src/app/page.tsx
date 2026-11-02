'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(false);
    setUploadMessage(`Uploading ${file.name}…`);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.details || data.error || `Upload failed (${res.status})`);
      if (!data.docId) throw new Error('The server finished parsing but did not return a document link.');
      router.push(`/reader/${data.docId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setUploadError(true);
      setUploadMessage(`Could not open this PDF: ${message}`);
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 sm:p-8 bg-[#191919] text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">ReflowPDF</h1>
        <p className="text-lg text-gray-400">
          Mobile-first responsive PDF reader that transforms static layouts into clean, Notion-style document views.
        </p>
        
        <div className="flex w-full flex-col sm:w-auto sm:flex-row gap-3 sm:gap-4 mt-4">
          <Link 
            href="/reader/doc_123" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View Demo Document
          </Link>
          
          <input
            ref={fileInput}
            id="pdf-upload"
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            disabled={isUploading}
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={isUploading}
            className={`bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-gray-600 disabled:opacity-60 disabled:cursor-wait ${isUploading ? 'cursor-wait' : ''}`}
          >
            {isUploading ? 'Parsing PDF…' : 'Open PDF'}
          </button>
        </div>
        {uploadMessage && (
          <p role={uploadError ? 'alert' : 'status'} aria-live="polite" className={`max-w-xl break-words text-sm ${uploadError ? 'text-red-300' : 'text-gray-300'}`}>
            {uploadMessage}
          </p>
        )}
      </main>
    </div>
  );
}
