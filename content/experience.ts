import type { Experience } from "./types";

// Display order set by Devansh: IIT BHU → ImpactBridge → Be Educated (freelance).
export const experience: Experience[] = [
  {
    slug: "iit-bhu",
    company: "IIT BHU",
    role: "Summer Research Intern",
    period: "May–July 2026",
    location: "Varanasi, India",
    status: "research",
    badge: "Research",
    summary:
      "Multi-teacher knowledge distillation — compressing ~223M-param multimodal models into a 3–5M-param student for in-browser inference via ONNX Runtime Web.",
    bullets: [
      "Funded research project on multimodal depression detection.",
      "Multi-teacher knowledge distillation: MMFformer (~223M params) and the Gimeno-Gómez baseline (~12.85M params) into a 3–5M-param student.",
      "Deployment target: ONNX Runtime Web for private, client-side inference.",
      "Next.js frontend; training on a lab RTX A4000 GPU.",
      "Found and fixed a hyperparameter bug — weight_decay defaulting to 1e-3 vs the paper's 0.1.",
    ],
  },
  {
    // ⚠️ CONTENT PENDING (§4): Devansh to supply the role + responsibilities.
    // Renders gracefully as a "details coming" state — do NOT invent anything.
    slug: "impactbridge",
    company: "ImpactBridge",
    role: "",
    period: "April–July 2026",
    location: "Part-time",
    status: "pending",
    badge: "Pending",
    pending: true,
    summary: "Details coming soon.",
    bullets: [],
  },
  {
    slug: "be-educated",
    company: "Be Educated",
    role: "Freelance Engineer",
    url: "https://beeducated.co.in",
    period: "Dec 2025 – Feb 2026",
    location: "Freelance · Remote",
    status: "live",
    badge: "Live",
    summary:
      "Solo-built a production coaching-institute LMS — Cashfree payments with webhook verification, role-scoped access via Supabase RLS, and a SQL-graded exam engine.",
    bullets: [
      "Built a full coaching-institute LMS solo (JEE/NEET prep), in production with real users.",
      "Cashfree payments with webhook signature verification for trustworthy enrollment activation.",
      "Clerk auth with role-scoped access (admin, student, parent, teacher, batch_manager) enforced via Supabase RLS.",
      "Exam engine with SQL auto-grading (MCQ, true/false, numerical with tolerance) and server-side auto-submit.",
      "Automated fee reminders via a node-cron escalation ladder.",
    ],
  },
];
