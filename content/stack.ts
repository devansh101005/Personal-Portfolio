import type { StackGroup } from "./types";

// Only tools actually used in the projects/experience on this site (checked
// against the repos). No filler: every item maps to real shipped or research work.
export const stack: StackGroup[] = [
  { category: "Languages", items: ["TypeScript", "Python", "SQL"] },
  {
    // Be Educated, ImpactBridge, ConquerManage/LockForge/Limitron · VidhiVault
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Celery"],
  },
  {
    // Be Educated (Supabase RLS), Redis systems, TwitX/SellWell (Prisma), VidhiVault (pgvector)
    category: "Data",
    items: ["PostgreSQL", "Redis", "Prisma", "Supabase", "pgvector"],
  },
  {
    // LightDep, BioX-DTI, VidhiVault, WhatsApp analysis
    category: "ML & DL",
    items: ["PyTorch", "ONNX Runtime", "Hugging Face", "scikit-learn"],
  },
  {
    // Be Educated (React), ImpactBridge (Angular), TwitX/DentCare (Next.js)
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "Tailwind"],
  },
  // Docker Compose across the Redis systems; CI in Be Educated; cron in TwitX
  { category: "Infra", items: ["Docker", "GitHub Actions"] },
];
