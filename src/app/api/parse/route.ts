import { NextRequest, NextResponse } from 'next/server';
import { documentStore } from '@/data/store';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log("Forwarding to Python backend at port 8000...");

    // Send the file directly to our local Python FastAPI server
    const pyFormData = new FormData();
    pyFormData.append('file', file);

    const parserUrl = process.env.PDF_PARSER_URL ?? 'http://127.0.0.1:8000/api/parse';
    let pyRes: Response;
    try {
      pyRes = await fetch(parserUrl, { method: 'POST', body: pyFormData });
    } catch {
      return NextResponse.json({
        error: 'Python PDF parser is unavailable',
        details: 'Start the Python backend with “py backend/main.py”, then upload again.',
      }, { status: 503 });
    }

    if (!pyRes.ok) {
      const body = await pyRes.json().catch(() => ({}));
      throw new Error(body.detail || body.error || `Python backend failed: ${pyRes.status} ${pyRes.statusText}`);
    }

    const pyData = await pyRes.json();
    if (pyData.error) {
      return NextResponse.json({ error: 'PDF parsing failed', details: pyData.error }, { status: 422 });
    }

    const markdown = pyData.markdown;
    if (typeof markdown !== 'string' || !markdown.trim()) {
      return NextResponse.json({ error: 'PDF parsing failed', details: 'The parser returned no readable text.' }, { status: 422 });
    }
    const docId = `doc_${Date.now()}`;
    const title = file.name.replace(/\.pdf$/i, '');

    // Store in our Next.js local store for the Reader page to load
    documentStore.set(docId, { title, markdown });

    return NextResponse.json({ docId, title });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to parse document', details: error instanceof Error ? error.message : 'Unknown server error' }, { status: 500 });
  }
}
