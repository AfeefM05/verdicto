<h1 align="center">Verdicto  ⚖️🇮🇳 — Indian Legal Assistant</h1>

<p align="center"><strong>AI-powered predictions, contract risk analysis, retrieval‑augmented legal research, timelines and a refined dashboard—purpose‑built for Indian law.</strong></p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-Components-111?logo=radixui&logoColor=white" />
  <img alt="Vercel AI SDK" src="https://img.shields.io/badge/Vercel%20AI%20SDK-Gemini-000?logo=vercel&logoColor=white" />
</p>

---

### ✨ What you get (at a glance)

<table>
  <tr>
    <td><strong>🔮 Case Predictions</strong><br/>Outcome likelihood (0–100), timeline ⏱️, and factor breakdown ✍️ tuned for Indian courts (IPC/CrPC, precedents, procedure).</td>
    <td><strong>📄🛡️ Contract Analyzer</strong><br/>Uploads to a smart upstream for clause‑level risks, suggestions, and final risk score.</td>
  </tr>
  <tr>
    <td><strong>📚🧠 RAG Legal Assistant</strong><br/>Answers with sources and concise reasoning; designed for Indian legal references and public URLs.</td>
    <td><strong>🗓️ Advanced Timeline</strong><br/>Visualize stages, delays, and expected ranges for complex matters.</td>
  </tr>
  <tr>
    <td><strong>🎛️ Polished Dashboard</strong><br/>Modules for predictions, research, contracts, documents, clients, calendar, and settings.</td>
    <td><strong>🔒 Privacy‑minded</strong><br/>Your UI talks to your own Next.js API routes; env toggles control external calls.</td>
  </tr>
</table>

---

### 🗂️ Feature Overview (Table)

<table>
  <tr>
    <th align="left">Module</th>
    <th align="left">Purpose</th>
    <th align="left">Key Actions</th>
    <th align="left">API / Upstream</th>
  </tr>
  <tr>
    <td>🔮 Predictions</td>
    <td>Estimate outcome likelihood, timeline and factors for Indian cases</td>
    <td>Submit facts → receive probability (0–100), timeline, feature points</td>
    <td><code>POST /api/predict</code> → local AI backend or Gemini fallback</td>
  </tr>
  <tr>
    <td>📚 Assistant (RAG)</td>
    <td>Answer questions with concise reasoning and source links</td>
    <td>Ask query → receive grounded response with references</td>
    <td><code>POST /api/assistant</code> → legal assistant upstream</td>
  </tr>
  <tr>
    <td>📄 Contract Analyzer</td>
    <td>Assess clause‑level risks and produce final risk score</td>
    <td>Upload file → get risks, suggestions, score</td>
    <td><code>POST /api/analyze</code> → smart analyzer upstream</td>
  </tr>
  <tr>
    <td>🗓️ Timeline</td>
    <td>Visualize stages and delays across matter lifecycle</td>
    <td>Review computed timeline; refine inputs</td>
    <td>Client‑side visualization</td>
  </tr>
  <tr>
    <td>🎛️ Dashboard</td>
    <td>Navigation across modules with protected routes</td>
    <td>Manage matters, docs, clients, settings</td>
    <td>Next.js App Router + shadcn/ui</td>
  </tr>
</table>

---

### 🧩 How it works (Feature Cards)

<table>
  <tr>
    <td>
      <strong>1) Client UI (Next.js + shadcn/ui)</strong><br/>
      Responsive pages for Predictions, Assistant, Contracts, etc. Inputs are validated and sent to your own API routes for privacy and consistency.
    </td>
    <td>
      <strong>2) API Routes (Server)</strong><br/>
      <code>/api/predict</code> normalizes outputs and prefers a local AI backend; falls back to Gemini when unavailable. <code>/api/analyze</code> and <code>/api/assistant</code> proxy to upstream services safely.
    </td>
  </tr>
  <tr>
    <td>
      <strong>3) External Services</strong><br/>
      Contract analysis and the RAG assistant are called via explicit proxies; document extraction can use a configurable extractor service.
    </td>
    <td>
      <strong>4) AI Fallbacks & Normalization</strong><br/>
      Predict responses are coerced into a consistent schema (probability, timeline, feature points, related records) for stable UI rendering.
    </td>
  </tr>
  <tr>
    <td>
      <strong>5) Data Flow & Privacy</strong><br/>
      The browser never calls upstreams directly—requests go through your API, enabling environment‑based routing and easier compliance.
    </td>
    <td>
      <strong>6) Indian‑law Context</strong><br/>
      Prompts and outputs are tuned for IPC/CrPC, precedent orientation, and Indian court timelines with clear caveats (informational, not legal advice).
    </td>
  </tr>
</table>

---

### 🌏 Why it’s uniquely Indian‑law‑first

- **Context‑aware prompts**: Aligns with Indian legal practice—sections, precedent culture, and procedure.
- **Explainable outputs**: Feature points, linked references, and plain‑language timelines.
- **Works online or local‑first**: Uses your own API routes and optional local backend.
- **Minimal setup**: Just set environment values; no complex bootstrap steps.

---


### 🧭 UX principles

- **Alignment & spacing**: Clean vertical rhythm, grid‑like sections, and readable line lengths.
- **“Boxed” content**: Feature grid above uses a table for card‑like grouping on GitHub.
- **Fast feel**: UI primitives from shadcn/ui, thoughtful loading, and toasts.

---

Enjoy building with Verdicto V2—focused, explainable, and delightful for Indian legal workflows. 🙌📜💡
