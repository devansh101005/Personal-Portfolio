import type { Project } from "./types";

// FILL ME: each project below has structure but empty content.
// Fill oneLiner, stack, liveUrl, githubUrl, image, and the detail fields per project.
// Prompt format I'll use: "Fill <slug>: oneLiner=… / stack=[…] / live=… / repo=… / overview=… etc."
//
// Organized by tier (§5), not by domain — domain shows as `domainTag` on the card.
// ⚠️ Never add FrameForge or any "LinkedIn automation" project (abandoned). FitX is resume-only (excluded).

export const projects: Project[] = [
  // ──────────── Group A — Production & Systems Work ────────────
  {
    slug: "be-educated",
    name: "Be Educated",
    group: "production",
    domainTag: "Full-stack",
    oneLiner:
      "Full-stack coaching-institute management platform for JEE/NEET prep — admins, students, parents, teachers, fees, exams.",
    status: "in-progress",
    liveUrl: "https://beeducated.co.in",
    period: "2025",
    stack: [
      "React 19",
      "TypeScript",
      "Express",
      "Supabase (PostgreSQL)",
      "Clerk",
      "Cashfree",
      "TailwindCSS",
      "Resend",
    ],
    overview:
      "BeEducated is a multi-role SaaS platform for an Indian coaching institute targeting JEE/NEET students. It covers the full operational surface: student enrollment, batch management, course content delivery, an exam engine, fee collection, and automated reminders. Roles include admin, student, parent, teacher, and batch_manager, each with scoped access enforced at the database layer via Supabase RLS.",
    problem:
      "Coaching institutes managing hundreds of JEE/NEET students across multiple batches needed a single system for enrollment, fee tracking, exam delivery, and parent communication — replacing scattered spreadsheets and manual processes.",
    approach:
      "Express + TypeScript backend with a module-per-domain structure (fees, exams, content, announcements, etc.) backed by Supabase with RLS policies as the authorization layer. Clerk handles auth; its webhooks sync user lifecycle events to Supabase. Cashfree is the active payment gateway with a webhook handler that routes enrollment-type orders through an authoritative state-transition path to guarantee activation even if the browser never hits the return_url.",
    architecture: [
      "Clerk webhooks (svix HMAC) sync user.created/updated/deleted to Supabase; `attachUser` middleware auto-creates users as a fallback if the webhook fires late — preserving role on upsert conflicts",
      "Cashfree PAYMENT_SUCCESS_WEBHOOK routes enrollment orders through `enrollmentService.verifyPayment()` for authoritative state transition; falls through to a generic fee handler if the order_id isn't an enrollment record",
      "Supabase RLS policies on every table enforce row-scoped access by role — students see only their own rows, teachers see their courses, service_role bypasses for server-side writes",
      "Exam engine: a SQL `grade_mcq_response` function auto-grades single_choice, multiple_choice, true_false, and numerical (with tolerance) questions; `calculate_attempt_results` upserts ranked results on conflict",
      "`node-cron` job at 21:00 IST sends fee reminders on a typed escalation ladder (due_in_7 → due_in_3 → due_tomorrow → overdue_week_1…overdue_week_4_plus), de-duplicated to prevent re-sends",
      "`setInterval` every 2 minutes auto-submits expired exam attempts server-side, independent of client disconnects",
    ],
  },
  {
    slug: "conquermanage",
    name: "ConquerManage",
    group: "production",
    domainTag: "Distributed Systems",
    oneLiner:
      "Two-service background job system: an HTTP producer enqueues tasks to Redis; a worker consumes, retries, and dead-letters them.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/ConquerManage",
    period: "Mar 2026",
    stack: ["TypeScript", "Node.js", "Express.js", "Redis", "ioredis", "Docker"],
    overview:
      "A self-built learning project implementing the producer/worker pattern for background task processing. A POST /enqueue endpoint pushes serialized tasks onto a Redis list; a configurable pool of worker loops pulls and executes them. Built as a TypeScript port of an earlier Go version to learn Redis list operations and async concurrency in Node.js.",
    problem:
      "Blocking HTTP handlers on slow operations (email delivery, image resizing) increases request latency; the work needs to be deferred to a background process without dropping tasks on failure.",
    approach:
      "The producer serializes tasks with a UUID and RPUSHes them to a Redis list. Workers BLPOP to block-wait with zero polling, process the task, and on failure re-enqueue with a decremented retry counter; tasks that exhaust their retries are RPUSHed to a dead-letter queue instead of being silently dropped.",
    architecture: [
      "Worker uses `redis.blpop('task_queue', 0)` — blocking indefinitely, no polling loop",
      "Configurable concurrency via a `WORKER_CONCURRENCY` env var: N async loops launched with `Promise.all`",
      "Retry logic decrements `task.retries` and re-enqueues; zero-retry tasks go to `task_queue:dead` via RPUSH",
      "SIGINT sets an `isShuttingDown` flag, awaits all in-flight worker promises, then calls `redis.quit()` before exit",
      "Per-field validation on POST /enqueue with task-type-specific checks (send_email requires `to` + `subject` in the payload)",
      "Docker Compose wires three services: redis:7-alpine, producer (port 3000), worker (port 3001) with a shared REDIS_URL",
    ],
    outcomes:
      "Hands-on exposure to Redis BLPOP semantics, dead-letter queue patterns, and graceful shutdown coordination in Node.js. No production deployment.",
  },
  {
    slug: "lockforge",
    name: "LockForge",
    group: "production",
    domainTag: "Distributed Systems",
    oneLiner:
      "HTTP API for distributed mutual exclusion — prevents concurrent processes from operating on the same shared resource.",
    status: "built",
    period: "Mar 2026",
    stack: ["TypeScript", "Node.js", "Express 5", "Redis", "ioredis", "Docker"],
    overview:
      "A REST API that lets multiple servers acquire, release, and extend named locks on shared resources. Built to learn distributed systems primitives — atomic operations, Lua scripting in Redis, and deadlock prevention. Not production middleware; a focused learning project with a complete implementation.",
    problem:
      "Multiple processes hitting the same resource concurrently (e.g., two payment servers processing the same order) need cross-process mutual exclusion that works across a network and survives process crashes without leaving permanent deadlocks.",
    approach:
      "Redis `SET NX PX` atomically acquires locks in one command — Redis's single-threaded execution guarantees only one caller wins. Lua scripts run inside Redis for release and extend operations, making the check-then-act sequence uninterruptible and eliminating TOCTOU race conditions. TTL auto-expiry handles the crash/deadlock case.",
    architecture: [
      "`redis.set(key, owner, 'NX', 'PX', ttl)` in `acquireLock()` — single command; a null return means the lock is held",
      "Lua GET+DEL script in `releaseLock()` — atomic owner check prevents deleting another process's lock",
      "Lua GET+PEXPIRE script in `extendLock()` — owner-only TTL extension, same atomicity guarantee",
      "`SCAN cursor MATCH lock:* COUNT 100` loop in `listLocks()` — avoids the blocking `KEYS` command",
      "403 vs 404 distinction on release: a post-Lua GET distinguishes 'not your lock' from 'not locked'",
      "Docker Compose wires the `lockforge` service to `redis:7-alpine` via internal DNS, Redis DB `/3`",
    ],
    outcomes:
      "Implemented all five lock operations (acquire, release, check, extend, list) with correct atomicity guarantees. A concurrent-test shell script (`scripts/test-concurrent.sh`) fires 5 simultaneous acquire requests; only one returns 200.",
  },
  {
    slug: "limitron",
    name: "Limitron",
    group: "production",
    domainTag: "Backend / Systems",
    oneLiner:
      "Express middleware API gateway that rate-limits requests per API key or IP using Redis sorted sets.",
    status: "built",
    period: "Mar 2026",
    stack: ["TypeScript", "Node.js", "Express", "Redis", "ioredis", "Docker"],
    overview:
      "Limitron is a rate-limiting API gateway built as a learning project. It sits in front of Express routes and throttles requests by API key or IP address. Built to understand sliding-window algorithms, Redis sorted sets, and Express middleware patterns.",
    problem:
      "APIs without rate limiting are vulnerable to abuse — a single client can flood requests, crash the server, or exhaust costs. Standard solutions (Nginx, API Gateway) hide the internals; building one from scratch exposes the actual mechanics.",
    approach:
      "A sliding-window log algorithm implemented with Redis sorted sets: timestamps are stored as scores (`ZADD`), stale entries pruned with `ZREMRANGEBYSCORE`, and the count checked with `ZCARD` — all O(log N). API keys map to named tiers stored as Redis hashes, allowing per-key limits without hardcoding.",
    architecture: [
      "Sliding-window log: `ZREMRANGEBYSCORE` evicts old entries, `ZCARD` counts, `ZADD` stores `randomUUID` as member with `Date.now()` as score",
      "Tier-based config: an `apikey:<key>` hash stores the tier name, a `tier:<name>` hash stores `max_requests` + `window_seconds` — middleware loads both per request",
      "Standard rate-limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`) set on every limited response",
      "Middleware applied only to `/api/*` via `app.use('/api', limiter, router)` — admin routes are unthrottled",
      "`GET /api/status` reads the current window state (`ZCARD`) without consuming a request slot",
      "Docker Compose wires limitron + `redis:7-alpine`, on Redis DB `/2` to avoid collisions with other local projects",
    ],
    outcomes:
      "Implemented a working sliding-window rate limiter from scratch; learned Redis sorted-set semantics and how industry-standard rate-limit headers (used by GitHub, Stripe) are structured. No production deployment.",
  },
  {
    slug: "legal-rag",
    name: "VidhiVault",
    group: "production",
    domainTag: "GenAI",
    oneLiner:
      "RAG backend for Indian legal documents — hybrid pgvector + tsvector retrieval, cross-encoder reranking, and Groq LLM answers with citations.",
    status: "in-progress",
    period: "Apr 2026",
    stack: [
      "FastAPI",
      "PostgreSQL + pgvector",
      "Sentence Transformers",
      "Celery + Redis",
      "Groq (Llama 3.1 70B)",
      "PyMuPDF",
      "Alembic",
      "pdfplumber",
    ],
    overview:
      "A domain-specific RAG system for Indian legal PDFs — judgments and statutes sourced from Indian Kanoon. A Celery worker handles async ingestion (parse → section-aware chunk → embed → store); at query time, hybrid retrieval + cross-encoder reranking feeds the top-5 chunks to Groq's Llama 3.1 70B, which generates a cited answer. Built from scratch without LangChain/LlamaIndex as an engineering demonstration of each pipeline stage.",
    problem:
      "Indian legal queries span both semantic meaning ('bail provisions under UAPA') and exact statutory references ('Section 439 CrPC') — pure vector or pure keyword retrieval fails one half. Naive RAG frameworks obscure the retrieval mechanics and make it impossible to measure or improve precision.",
    approach:
      "Two-stage retrieval: pgvector cosine search (HNSW index) and PostgreSQL tsvector full-text search run in parallel; results are fused via Reciprocal Rank Fusion (rank-based, avoiding score normalization across different scales); a cross-encoder then reranks the top-20 candidates before the LLM call. Each stage is independently measurable.",
    architecture: [
      "Hybrid retrieval fused with RRF (k=60): a pgvector HNSW cosine index + a generated PostgreSQL `tsvector` column with a GIN index — one DB, no extra infrastructure",
      "Cross-encoder reranking with `cross-encoder/ms-marco-MiniLM-L-6-v2` on the top-20 candidates before passing top-5 to the LLM",
      "Generator calls Groq's OpenAI-compatible endpoint over async `httpx`, parsing the Retry-After header and retrying up to 3 times on HTTP 429",
      "Celery + Redis async ingestion queue: document status tracked pending → processing → completed/failed, with the error stored on failure",
      "Section-aware chunker targets 512-token chunks with 50-token overlap, splitting on legal header patterns (Section X, Article Y, ORDER Z) before falling back to paragraph then sentence boundaries",
      "A SHA-256 file hash on upload (`file_hash UNIQUE`) prevents duplicate document ingestion",
    ],
    outcomes:
      "A 30-query manual evaluation against IPC and UAPA judgment documents: 13 good, 9 partial, 4 wrong, 2 abstain-wrong (missed an answer in the corpus), 6 abstain-correct (out-of-domain, correctly refused). The core pipeline is operational; the evaluator module and test suite remain stubs as of the last commit.",
  },
  { slug: "iitbhu-distillation", name: "IIT BHU — Knowledge Distillation", group: "production", domainTag: "ML Research", oneLiner: "", stack: [] },

  // ──────────── Group B — Experiments ────────────
  { slug: "whatsapp-chat-analysis", name: "WhatsApp Chat Analysis", group: "experiment", domainTag: "Data / Viz", oneLiner: "", stack: [] },
  {
    slug: "token-analyzer",
    name: "Token Analyzer",
    group: "experiment",
    domainTag: "GenAI",
    oneLiner:
      "Streamlit app that counts tokens and estimates cost for 8 LLMs across OpenAI, Gemini, and Claude.",
    status: "built",
    period: "Nov–Dec 2025",
    stack: ["Python", "Streamlit", "tiktoken"],
    overview:
      "A single-page Streamlit tool for estimating token counts and input costs before committing to an LLM API call. Supports plain text and a system + user prompt playground. Built as a personal utility to make token budgeting across different providers less manual.",
    problem:
      "Different LLMs use different tokenizers, and non-OpenAI providers (Gemini, Claude) don't expose a local tokenizer — making it hard to estimate token counts and costs before sending a request.",
    approach:
      "Uses tiktoken's exact BPE encoding for OpenAI models (gpt-4o, gpt-4o-mini, the cl100k_base family) and falls back to a 4-chars-per-token heuristic for Gemini and Claude, where no public tokenizer is available. Cost is calculated as (tokens / 1,000,000) × price_per_1M.",
    architecture: [
      "A `MODEL_CONFIG` dict centralises tokenizer name, provider, `price_per_1M`, and an `exact_tokens` flag per model",
      "`get_tokenizer()` dispatches on encoding family: `get_encoding()` for cl100k_base/p50k_base, `encoding_for_model()` for named models",
      "`estimate_tokens()` applies a `len(text)//4` heuristic for Gemini/Claude, with a Streamlit warning surfaced to the user",
      "The Prompt Playground combines the system and user fields into one string before tokenization, falling back to the raw text box if both are empty",
      "An optional `gpt-4o-mini` cross-tokenizer comparison renders behind a checkbox, shown only for OpenAI-provider models",
      "Two-column layout: token IDs and cost on the left, a per-token decode breakdown on the right; the breakdown is suppressed for heuristic models",
    ],
    outcomes:
      "Covers 4 OpenAI models with exact BPE counts and 4 Gemini/Claude models with heuristic estimates; the pricing table is hardcoded and will drift as providers update rates.",
  },

  // ──────────── Group C — A Tool I Built for Myself ────────────
  {
    slug: "twitx",
    name: "TwitX",
    group: "personal-tool",
    domainTag: "GenAI",
    oneLiner:
      "AI drafting copilot: pulls trending Reddit/HN/GitHub content and generates personalized tweet drafts, delivered via Telegram.",
    status: "in-progress",
    period: "May–Jun 2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Groq (llama-3.3-70b)",
      "Clerk",
      "Telegram Bot API",
      "Tailwind CSS v4",
      "GitHub Actions",
    ],
    overview:
      "A content drafting assistant for Tech Twitter creators. It runs a scheduled pipeline twice daily — scraping Reddit, Hacker News, and GitHub, filtering for the user's chosen niches, and calling an LLM to write tweet/thread drafts in their voice. Drafts land in Telegram for review; the user copies and posts manually.",
    problem:
      "Fitting daily content creation into a dev's schedule: sourcing relevant topics, drafting in a consistent voice, and reviewing efficiently — without building an auto-posting bot.",
    approach:
      "Keyword-weighted relevance scoring narrows 50+ scraped items to the top 15 before hitting the LLM. A structured prompt injects the user's own past tweets as voice anchors, plus liked/skipped feedback history as positive/negative signals. GitHub Actions replaces node-cron so the pipeline runs reliably without a persistent server.",
    architecture: [
      "A custom `dispatchUpdate` manually awaits all Telegram bot async handlers before responding — Vercel serverless kills the function the moment the HTTP response is sent, which would drop `sendMessage` calls under the standard `bot.processUpdate()`",
      "Relevance scorer: score = keywordHits × 10 + log(upvote_score + 1) × 5; the top 15 pass to the LLM — a hard cap prevents prompt bloat",
      "An OpenAI-compatible AI client routes to Groq by default but supports any OpenAI-compatible gateway via `AI_BASE_URL` / `AI_API_KEY` — no code change needed to swap providers",
      "Two-level JSON parse in `parseDrafts`: tries a full array parse first, then falls back to scanning for complete `{}` objects individually to salvage responses cut off by `max_tokens`",
      "A Clerk `clerkId` on the `User` model; a `resolveAppUser` middleware auto-provisions the DB row on first sign-in, mapping Clerk identity to the app's own user record",
      "A GitHub Actions cron fires at 09:00 and 19:00 UTC and runs `npm run pipeline:run` directly — sidestepping Vercel's 10s hobby timeout for the long per-user pipeline loop",
    ],
    outcomes:
      "MVP shipped with Telegram delivery working end-to-end; Discord delivery is stubbed but not implemented. Prompt personalization via voice samples and feedback history is wired into the schema and prompt builder.",
  },

  // ──────────── Group D — Guided Builds (Learning) ────────────
  {
    slug: "devx-ai",
    name: "DevX AI",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "Multi-tool AI SaaS with text generation and image manipulation, gated behind a free-tier counter and Clerk auth.",
    status: "live",
    liveUrl: "https://devxaiclient.vercel.app",
    githubUrl: "https://github.com/devansh101005/aisaas",
    period: "2025",
    stack: [
      "React 19",
      "Express 5",
      "Neon PostgreSQL",
      "Google Gemini",
      "Cloudinary",
      "ClipDrop API",
      "Clerk",
      "Zod",
    ],
    overview:
      "devX.ai is a full-stack AI SaaS that exposes six tools: article writing, blog-title generation, text-to-image, background removal, object removal, and PDF resume review. Free users are capped at 10 total generations; premium users have unlimited access. The React frontend and Express backend are deployed as independent Vercel projects.",
    problem:
      "Orchestrating multiple third-party AI APIs (Gemini for text, ClipDrop for image generation, Cloudinary for image transforms) behind a single authenticated API while enforcing a two-tier usage model without a dedicated billing service.",
    approach:
      "Free-tier usage is tracked as a counter in Clerk's privateMetadata, cached in-process for 60 seconds to cut Clerk API calls and invalidated immediately after any write. Premium gating is a simple check in shared helpers (requirePremium / checkPlanLimit) reused across all controllers. Gemini is called via the OpenAI SDK using Google's OpenAI-compatible base URL, so no extra SDK is needed. Cloudinary's gen_remove transformation handles object removal server-side without a separate ML call.",
    architecture: [
      "Gemini 2.0 Flash accessed via the OpenAI SDK with `baseURL` pointing to Google's OpenAI-compatible endpoint (`generativelanguage.googleapis.com/v1beta/openai/`)",
      "User plan/usage stored in Clerk `privateMetadata`; an in-memory Map cache (60s TTL) with explicit invalidation after metadata writes avoids per-request Clerk API calls",
      "Two-tier rate limiting: 105 req/15 min general, 25 req/15 min on AI routes; `trust proxy 1` set so Vercel's X-Forwarded-For is used for IP keying",
      "Zod schemas validate AI request bodies; HTML tags are stripped from all prompts before they reach any AI API",
      "Cloudinary `background_removal` and `gen_remove` effects for image editing; ClipDrop REST API for text-to-image (binary arraybuffer → base64 → Cloudinary upload)",
      "PDF resumes parsed to plain text with pdf-parse-fork server-side, then the extracted text is sent to Gemini for review; temp files cleaned up after read",
    ],
    outcomes:
      "Shipped and deployed. Rate-limit and CORS fixes across the last 10 commits reflect the debugging the serverless deployment needed around proxy IP detection and Vercel's cold-start behavior.",
  },
  {
    slug: "dentcare",
    name: "DentCare",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "Dental clinic web app with an AI voice assistant, appointment booking, and an admin dashboard.",
    status: "built",
    period: "Nov–Dec 2025",
    stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Vapi",
      "Resend",
      "TanStack Query",
      "Tailwind CSS",
    ],
    overview:
      "DentCare is a full-stack dental appointment platform where patients book appointments with dentists and get dental guidance via a real-time AI voice assistant. Admins manage doctors and track appointment status through a separate dashboard. Built as a portfolio project.",
    problem:
      "Needed a single app to handle patient auth, conflict-free appointment booking, admin doctor management, and AI-assisted dental consultation — without building a custom auth backend.",
    approach:
      "Clerk handles auth and subscription tiers; Prisma + PostgreSQL store appointments with booked-slot queries to prevent double-booking; the Vapi SDK powers the voice-AI session; Resend sends confirmation emails via a React Email template after a successful booking mutation.",
    architecture: [
      "Clerk user sync via a server action on first page load — polls `clerkId` uniqueness before inserting into the `users` table",
      "Admin gate as an env-var email comparison in a Next.js server component (`ADMIN_EMAIL !== userEmail` redirects to /dashboard)",
      "Slot-conflict prevention: `getBookedTimeSlots` queries appointments with status IN [CONFIRMED, COMPLETED] for a given doctorId + date before rendering available times",
      "A TanStack Query mutation (`useBookAppointment`) invalidates the `getUserAppointments` cache on success, triggering an automatic UI refresh",
      "Resend email sent inline in the booking mutation's `onSuccess` callback using a React Email component (`AppointmentConfirmationEmail`)",
      "Vapi voice session managed via event listeners (`call-start`, `call-end`, `speech-start`, `message`) set up and torn down in a single `useEffect`; the pro-plan gate is checked before rendering the widget",
    ],
    outcomes:
      "Covers the full booking lifecycle end to end: auth, slot selection, conflict avoidance, confirmation email, and voice AI — all within a single Next.js app.",
  },
  {
    slug: "sellwell",
    name: "SellWell",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "Multi-vendor e-commerce platform where sellers apply to open stores, list products, and buyers pay via Stripe or COD.",
    status: "in-progress",
    period: "Dec 2025 – Jan 2026",
    stack: [
      "Next.js 15",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Stripe",
      "Inngest",
      "ImageKit",
      "OpenAI",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    overview:
      "Sell Well is a multi-vendor marketplace built with the Next.js App Router. Sellers register stores that go through an admin approval flow before going live. Buyers browse products, apply coupons, and check out via Stripe or cash-on-delivery.",
    problem:
      "Coordinating multi-vendor order splitting, payment confirmation via async webhook, and background user-sync across Clerk and a Postgres database — without tight coupling.",
    approach:
      "Orders are split per seller at checkout time using a Map over cart items. Stripe session metadata carries the order IDs; a webhook handler resolves payment success/failure and updates order state. Clerk webhooks are forwarded to Inngest durable functions that sync user lifecycle events (create/update/delete) and schedule coupon deletion at expiry using step.sleepUntil.",
    architecture: [
      "Admin approval gate: stores start `status='pending'` / `isActive=false`; a `POST /api/admin/approve-store` flips both fields after admin review",
      "Stripe checkout: `POST /api/orders` creates per-seller Order rows, embeds orderIds in session metadata, and returns a session URL; the `POST /api/stripe` webhook uses `constructEvent` signature verification to mark orders paid or delete them on cancellation",
      "Inngest durable functions handle Clerk `user.created/updated/deleted` events and schedule coupon auto-deletion via `step.sleepUntil` at the coupon's `expiresAt`",
      "Coupon logic enforces three constraints at order time: new-user-only, member-only (checked via Clerk `has({ plan: 'plus' })`), and expiry",
      "AI-assisted product listing: uploading the first product image triggers a vision call to OpenAI that returns name + description JSON, pre-filling the form",
      "Cart stored as a JSON column on the User row; cleared atomically in the same Prisma transaction that confirms payment",
    ],
    outcomes:
      "Project is functional. Core flows — auth, store approval, Stripe checkout, Inngest sync — are wired up and structurally correct.",
  },
];

export const productionProjects = projects.filter((p) => p.group === "production");
export const experimentProjects = projects.filter((p) => p.group === "experiment");
export const personalToolProjects = projects.filter((p) => p.group === "personal-tool");
export const guidedProjects = projects.filter((p) => p.group === "guided");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
