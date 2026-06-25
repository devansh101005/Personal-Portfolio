import type { StackGroup } from "./types";

// Rendered as categorized plain-text rows with inverted chip labels (§1B).
export const stack: StackGroup[] = [
  { category: "Languages", items: ["TypeScript", "Python", "SQL"] },
  {
    category: "Backend & Data",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Prisma"],
  },
  { category: "Frontend", items: ["Next.js", "React", "Tailwind"] },
  { category: "ML & Infra", items: ["PyTorch", "ONNX Runtime", "pgvector", "Docker"] },
];
