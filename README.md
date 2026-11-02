# ReflowPDF 📄✨

> **A Notion-style, mobile-first responsive PDF reader.**  
> Convert fixed-dimension A4/Letter PDFs into clean, readable, reflowable feeds—no more pinching, zooming, or horizontal scrolling on your phone.

---

## 🌟 Why ReflowPDF?

Traditional PDF readers render rigid 2D coordinate canvases. On mobile screens, this forces readers into a frustrating cycle of pinching and horizontal panning. 

**ReflowPDF solves this** by extracting document structure and converting it into a clean, modern web feed resembling a **Notion page** or **ChatGPT thread**:
- **Zero Horizontal Scrolling:** Text wraps naturally to any viewport width.
- **Native Math Rendering:** Formulas are extracted into LaTeX and rendered crisply using **KaTeX** (e.g., $E = mc^2$ and block equations).
- **Notion Aesthetics:** Dedicated dark mode (`#191919`), elegant typography, blockquotes, and callouts.
- **Reading Controls:** Adjustable font sizes ($A-$ / $A+$), light/dark mode switch, and a live reading progress bar.
- **Table of Contents:** Jump directly to any section with the slide-out navigation drawer.
- **Installable Mobile PWA:** Add ReflowPDF to your phone's home screen and use it in full-screen standalone mode like a native app.
- **100% Local & Private:** Powered by a local Python extraction engine—no third-party cloud uploads or paid API keys required.

---

## 🏗️ Architecture

```
[ Uploaded PDF ]
       │
       ▼
[ Local Python Backend (FastAPI + PyMuPDF4LLM) ]
       │  • Semantic Chunking (Headings, Paragraphs, Lists)
       │  • LaTeX Math Detection ($$...$$)
       │  • Table & Image Extraction
       ▼
[ Next.js App Router ]
       │  • React-Markdown + Remark-Math + Rehype-KaTeX
       │  • Responsive Notion Design System
       ▼
[ Reflowable Reader (Desktop & Mobile PWA) ]
```

---

## 🚀 Quick Start (Run Locally)

You will need **two terminal windows**: one for the Python parser backend, and one for the Next.js web application.

### 1. Start the Python Backend (Port 8000)

```bash
# In your terminal:
cd pdf_view

# Install Python dependencies (FastAPI, PyMuPDF4LLM, Uvicorn)
pip install -r backend/requirements.txt

# Run the backend server
python backend/main.py
```
> The backend will start on `http://127.0.0.1:8000`.

---

### 2. Start the Next.js Frontend (Port 3000)

Open a **second terminal window**:

```bash
cd pdf_view

# Install dependencies
npm install

# Run the Next.js dev server
npm run dev
```

Visit **`http://localhost:3000`** in your browser. Click **"Open PDF"** or **"View Demo Document"** to start reading!

---

## 📱 Using ReflowPDF on Your Phone

ReflowPDF is built mobile-first and configured as an **installable Progressive Web App (PWA)**:

1. Connect your phone to the **same Wi-Fi network** as your computer.
2. In your phone's browser (Safari on iOS or Chrome on Android), go to your computer's local IP address:
   ```text
   http://<YOUR_COMPUTER_IP>:3000
   ```
3. **Install to Home Screen:**
   - **iPhone (Safari):** Tap **Share** ➔ **Add to Home Screen**.
   - **Android (Chrome):** Tap **Menu (⋮)** ➔ **Install app** (or **Add to Home screen**).
4. Open the ReflowPDF app from your home screen. Tap **"Open PDF"** to pick any document from your phone's storage and read comfortably!

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide Icons
- **Markdown & Math Engine:** `react-markdown`, `remark-math`, `remark-gfm`, `rehype-katex`, `katex`
- **Backend Parser:** Python, FastAPI, `pymupdf4llm`
- **Mobile Experience:** Web App Manifest (PWA), Standalone Display Mode

---

## 📄 License

MIT License. Free to use, modify, and distribute.
