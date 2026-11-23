<div align="center">

# 🎯 Rate My Chances

### *AI-Powered Career Intelligence & Hiring Probability Modeling*

Predict your selection probability for top-tier tech roles, benchmark your technical depth against verified hires, identify critical skill gaps, and unlock a personalized preparation roadmap.

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: Attribution](https://img.shields.io/badge/License-Attribution%20Required-blueviolet?style=for-the-badge)](./LICENSE)

---

</div>

## 💡 The Problem

Every hiring cycle, millions of engineers ask:
- *"Can I realistically crack Google, Microsoft, or high-growth unicorns right now?"*
- *"Why am I getting filtered out after 50+ resume submissions?"*
- *"What exact distributed systems or scale competencies am I missing for Mid/Senior roles?"*

Most career platforms only offer surface-level keyword ATS checklists or generic resume templates. **Rate My Chances** replaces guesswork with data-driven career intelligence powered by Google's **Gemini 2.5 Flash** model.

---

## 🚀 Core Features

### 🎯 1. Chance Score & Confidence Index
- An animated radial probability gauge computing your real hiring odds (0–100%) calibrated to the target company's bar.
- Confidence intervals (**High**, **Medium**, **Calibrating**) reflecting the clarity and evidence of signals in your profile.

### 📊 2. Deep Skill Gap Analysis
- **Verified Strengths**: Highlights competencies with strong, verified signals (e.g., React, Node.js, Data Structures).
- **Critical Gaps**: Pinpoints missing architectural depth (e.g., High-concurrency systems, Caching layers, Distributed observability).

### 📈 3. You vs. Average Hire Benchmark
- Visual percentile comparison across 4 key evaluation pillars:
  - **Projects Depth & Production Scale**
  - **DSA / Algorithmic Problem Solving**
  - **System Design & Distributed Architecture**
  - **Open Source / Proof of Work**

### 👨‍💼 4. AI Bar Raiser & Recruiter Simulation
- Simulates senior hiring committee deliberation:
  - **Resume Impact Score** & **Technical Depth Rating**
  - **Objective Verdict**: Honest appraisal of your profile scope.
  - **Friction Points & Hiring Risks**: Unfiltered identification of potential rejection causes.

### 💰 5. Salary Predictor & Career Path Matching
- **Target Compensation Band**: Real-time market compensation projections for your experience tier.
- **Alternative High-Fit Employers**: Identifies sibling companies where your profile signals yield higher immediate probabilities (e.g., *Google SWE: 68%* ➔ *Microsoft: 81%* ➔ *Razorpay: 89%*).

### 📚 6. Personalized Action Roadmap
- A milestone-driven preparation timeline with estimated time commitments and quantified probability boosts (e.g., `+12% Chance`).

### 🔥 7. Viral Roast Mode
- Toggleable brutally candid critique highlighting buzzword fluff, repetitive project clones, and resume clichés with 1-click clipboard sharing.

---

## 🎨 Design System & UI Highlights

The user interface follows a modern, content-first design philosophy:

| Pillar | Implementation |
|---|---|
| **Layout** | **Bento Grid** with balanced, asymmetric cell spanning. |
| **Surfaces** | **Glassmorphism** — Translucent frosted glass (`backdrop-blur-xl`), crisp gradient borders, and multi-layer depth. |
| **Buttons** | **Claymorphism** — Tactile 3D button shapes with inner lighting highlights and responsive tap physics. |
| **Typography** | **Minimalism** — Clean, geometric typography with generous whitespace and high typographic contrast. |
| **Animations** | **Material / Fluent Transitions** — Smooth spring curves (`cubic-bezier(0.1, 0.9, 0.2, 1)`) and celebratory particle physics. |

---

## 🏗️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **AI Intelligence**: [Google GenAI SDK](https://github.com/google-gemini/generative-ai-js) (`gemini-2.5-flash`) with schema-enforced structured JSON output
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glass/Clay utility tokens
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons & Effects**: [Lucide React](https://lucide.dev/), `canvas-confetti`

---

## ⚡ Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/as04-CyberNova/Rate_My_Chances.git
cd Rate_My_Chances
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Your Environment
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Tip: You can obtain a free API key from [Google AI Studio](https://aistudio.google.com).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Fork or import this repository into your GitHub account.
2. Go to [Vercel](https://vercel.com/) and create a **New Project**.
3. Under **Environment Variables**, configure:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
4. Click **Deploy**.

---

## 📜 License & Attribution Notice

This project is licensed under a custom attribution license. 

**Requirement**: If you fork, deploy, redistribute, or use any substantial portion of this project, you **must explicitly credit the original author**:
- **Author**: `as04-CyberNova`
- **Original Repository**: [https://github.com/as04-CyberNova/Rate_My_Chances](https://github.com/as04-CyberNova/Rate_My_Chances)

See the full [LICENSE](./LICENSE) file for complete terms.
