# ReflowPDF

ReflowPDF turns PDFs into responsive Markdown documents for comfortable reading on phones and desktops.

## Run locally

The web app sends uploaded PDFs to a small Python parsing service. Run both processes in separate terminals:

```powershell
# Terminal 1: Python parser
py -m venv .venv
.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.venv\Scripts\python.exe backend\main.py

# Terminal 2: Next.js app
npm install
npm run dev
```

If Windows reports that no Python version is installed for `py`, install Python 3.12 first. This machine has a bundled Python runtime, so its project environment is already set up at `.venv`; use `.venv\Scripts\python.exe` for the parser.

Open `http://localhost:3000` on the computer. To try the app from a phone on the same Wi-Fi, start Next.js with `npm run dev -- --hostname 0.0.0.0` and open the computer's LAN address (for example, `http://192.168.1.20:3000`). Keep the Python parser running on that same computer; the Next.js server contacts it at `127.0.0.1:8000`.

For a separately hosted parser, set `PDF_PARSER_URL` in the Next.js server environment to its `/api/parse` endpoint. The current document store is a local JSON file, so uploaded documents are intended for a single persistent app instance and are not shared across separate deployments or instances.

## Reader behavior

The reader uses a narrow text column, adjustable type size, light/dark themes, reading progress, and a contents panel. Tables and code/math blocks scroll within their own bounds on small screens so the full page can remain in portrait layout.
