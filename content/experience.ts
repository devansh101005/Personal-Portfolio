import type { Experience } from "./types";

// Most-recent / strongest first. Be Educated leads (production, live).
export const experience: Experience[] = [
  {
    slug: "be-educated",
    company: "Be Educated",
    role: "Founding Engineer",
    url: "https://beeducated.co.in",
    period: "2024 — Present",
    location: "Remote · Part-time",
    status: "live",
    badge: "Live",
    summary:
      "Solo-built a production ed-tech LMS — Razorpay payments with webhook verification, Clerk RBAC across 4 dashboards, a full exam engine, and 50+ REST APIs.",
    bullets: [
      "Built a full ed-tech LMS solo, in production with real users.",
      "Integrated Razorpay payments with webhook signature verification for trustworthy payment state.",
      "Clerk authentication with role-based access control (RBAC) across 4 dashboards.",
      "Designed a full online exam engine and shipped 50+ REST APIs.",
      "Part-time alongside coursework.",
    ],
  },
  {
    slug: "iit-bhu",
    company: "IIT BHU",
    role: "Summer Research Intern",
    period: "Summer 2025",
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
    // Render gracefully as a "details coming" state — do NOT invent anything.
    slug: "impactbridge",
    company: "ImpactBridge",
    role: "",
    period: "2025",
    location: "—",
    status: "pending",
    badge: "Pending",
    pending: true,
    summary: "Details coming soon.",
    bullets: [],
  },
];
