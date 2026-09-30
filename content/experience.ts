import type { Experience } from "./types";

// Display order set by Devansh: IIT BHU → Be Educated (freelance, Jun 2025 – present) → ImpactBridge.
export const experience: Experience[] = [
  {
    slug: "iit-bhu",
    company: "IIT BHU",
    logo: "/logos/iitbhu-v2.png",
    role: "Summer Research Intern",
    period: "May–July 2026",
    location: "Varanasi, India",
    status: "research",
    badge: "Research",
    summary:
      "Built LightDep, a 3.96 MB distilled model for depression screening that runs on the device. The paper got accepted at IEEE ANTS 2026, and I'm joint first author.",
    bullets: [
      "Distilled a 5-model teacher ensemble into LightDep, a small two-stream (face + voice) transformer. The INT8 ONNX build is 3.96 MB, 28× smaller than its teacher, and runs in 96 ms on one CPU thread. The same file also runs in a browser tab and on phones.",
      "Main finding: distillation only helps when the teacher is a stronger, well-calibrated screener. On D-Vlog it lifted recall by +10.4 (p = 0.045) and F1 by +4.3. On LMVD, where the teachers were poorly calibrated, it gave nothing significant.",
      "Reran it over 10 seeds on a second GPU and the gain held on all four metrics (p ≤ 0.003 after Holm correction).",
      "While reproducing the MMFformer teacher I found its weight_decay default was 1e-3, not the paper's 0.1.",
      "Paper: “LightDep: Knowledge-Distilled Multimodal Depression Screening for Mobile and Edge Devices”, accepted at IEEE ANTS 2026.",
    ],
  },
  {
    slug: "be-educated",
    company: "Be Educated",
    logo: "/logos/beeducated-v2.png",
    role: "Freelance Engineer",
    url: "https://beeducated.co.in",
    period: "Jun 2025 – Present",
    location: "Freelance · Remote",
    status: "past",
    badge: "Freelance",
    summary:
      "Built the whole platform for a JEE/NEET coaching institute on my own: enrollment, Cashfree fee payments, an exam engine, and separate dashboards for five roles.",
    bullets: [
      "Built it end to end on my own: React frontend, Express + TypeScript API, and Supabase Postgres.",
      "Fees through Cashfree, with installments and coupons. A webhook activates the enrollment even if the student closes the tab before the redirect.",
      "Clerk login with five roles (admin, student, parent, teacher, batch manager), and Supabase row-level security decides who sees what.",
      "Exam engine that grades in SQL: MCQ, true/false and numerical answers with tolerance. Expired attempts get auto-submitted on the server.",
      "Daily fee-reminder job at 9 PM IST that escalates from “due in 7 days” to “overdue”, without sending the same reminder twice.",
    ],
  },
  {
    // Verified from Devansh's 4 commits in the org repo (read-only) + his notes.
    // The repo is private, so no repo link; he chose not to link the live site.
    slug: "impactbridge",
    company: "ImpactBridge",
    logo: "/logos/impactbridge-v2.png",
    role: "Web Developer Intern",
    period: "April–July 2026",
    location: "Part-time",
    status: "past",
    badge: "Internship",
    summary:
      "Built the volunteer side of ImpactBridge, a platform that connects NGOs with volunteers: signup and login, an apply flow with resume upload, and an email to the NGO for every application.",
    bullets: [
      "Built volunteer accounts from scratch on the existing Angular 19 + Node/Express app: a separate signup and login (only one of the NGO or volunteer sessions can be active at a time), and a route guard that sends you back to the opportunity you were trying to open.",
      "Added an Apply Now flow. The form pre-fills from the volunteer's profile and the opportunity, takes an optional resume (PDF/DOC/DOCX up to 5 MB, stored on Cloudinary), and emails the NGO through EmailJS. If the email fails, the application still gets saved.",
      "The data lives in Google Sheets, so passwords are stored as bcrypt hashes (12 rounds) plus a secret pepper kept on the server, so a leaked sheet on its own doesn't expose them.",
      "Kept existing NGOs working: if an opportunity already has its own application link (like a Google Form), Apply Now still opens that. The feature was reviewed and merged into main.",
      "My last task was a PR to cut the server's memory use on Render. I trimmed request logging to one line per request and kept sensitive request data out of the logs, Sheets reads got a 60-second cache that clears on every write, and the global timeout dropped from 120s to 30s.",
    ],
  },
];
