export const mockData = {
  id: "doc_123",
  title: "Quantum Computing Fundamentals",
  markdown: `
# Quantum Computing Fundamentals

This is a sample document to demonstrate Notion-style reflowable rendering. PDF documents have traditionally been hard to read on mobile devices, but now we can render them beautifully!

> **ReflowPDF** solves the reading experience by extracting structured text, images, and math equations into an accessible, responsive layout.

## Math Example
Here is a block equation rendered natively:

$$ T(n) = 2T(n/2) + \\mathcal{O}(n) $$

And an inline equation: $E = mc^2$.

## Responsive Images
Images are extracted from the PDF and displayed responsively:

![Quantum Circuit](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Quantum_logic_gate.svg/512px-Quantum_logic_gate.svg.png)

## Table Example

| Qubit | State 0 | State 1 |
|---|---|---|
| $q_0$ | 0.707 | 0.707 |
| $q_1$ | 1.000 | 0.000 |

Thank you for using ReflowPDF!
  `
};
