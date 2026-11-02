import os
import tempfile

import pymupdf4llm
from fastapi import FastAPI, File, HTTPException, UploadFile

app = FastAPI()


@app.post("/api/parse")
async def parse_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf" and not (file.filename or "").lower().endswith(".pdf"):
        raise HTTPException(status_code=415, detail="Please choose a PDF file.")

    tmp_path = None
    try:
        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="The uploaded PDF is empty.")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        markdown = pymupdf4llm.to_markdown(tmp_path)
        if not markdown.strip():
            raise HTTPException(status_code=422, detail="No readable text was found in this PDF.")
        return {"markdown": markdown, "title": os.path.splitext(file.filename or "Document")[0]}
    except HTTPException:
        raise
    except Exception as error:
        print(f"PDF parsing failed: {error}")
        raise HTTPException(status_code=422, detail="This PDF could not be parsed. It may be encrypted or damaged.") from error
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
