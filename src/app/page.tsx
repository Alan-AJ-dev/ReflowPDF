import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#191919] text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight">ReflowPDF</h1>
        <p className="text-lg text-gray-400">
          Mobile-first responsive PDF reader that transforms static layouts into clean, Notion-style document views.
        </p>
        <Link 
          href="/reader/doc_123" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          View Demo Document
        </Link>
      </main>
    </div>
  );
}
