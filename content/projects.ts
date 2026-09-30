import type { Project } from "./types";

// Every fact below was checked against the project's own repo (code, README,
// eval files, git history) or, for LightDep, the research notes. No invented
// numbers — if something couldn't be verified it was left out.
//
// To add/edit a project: fill oneLiner, stack, liveUrl/githubUrl, image
// (put files in /public/projects/<slug>/), and the detail fields.
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
      "The full platform for a JEE/NEET coaching institute: enrollment, fee payments, exams, and dashboards for five roles. I built it solo as a freelance project.",
    liveUrl: "https://beeducated.co.in",
    githubUrl: "https://github.com/devansh101005/beeducatedweb",
    period: "Jun 2025 – Present",
    image: {
      src: "/projects/be-educated/cover.webp",
      alt: "Be Educated homepage: IIT-JEE & NEET Foundation Institute",
      caption: "The public site at beeducated.co.in.",
    },
    stack: [
      "React 19",
      "TypeScript",
      "Express",
      "Supabase (Postgres)",
      "Clerk",
      "Cashfree",
      "Tailwind CSS",
      "Resend",
    ],
    highlights: [
      "Built solo, from the database schema to the admin dashboards.",
      "Payments can't get lost: the Cashfree webhook activates the enrollment even if the student never makes it back to the site.",
      "Access control lives in the database (Supabase row-level security), not just in the UI.",
      "Came back later to harden it: webhook signature checks, server-side exam timing, idempotent payment verification, rate limits on payments, plus unit tests and CI.",
    ],
    overview:
      "Be Educated is a coaching institute for JEE/NEET and foundation classes. I built their whole system: the public site, student enrollment, batches, course content, fee collection with installments and coupons, an online exam engine, announcements, and automatic fee reminders.\n\nThere are five kinds of users (admin, student, parent, teacher, batch manager) and each one gets its own dashboard and only sees their own data.",
    problem:
      "The institute was managing fees, batches, tests and parent updates with spreadsheets and manual work, and none of it was connected.",
    approach:
      "Express + TypeScript backend, split into one module per area (fees, exams, content, and so on), on Supabase Postgres. Clerk handles login, and a webhook keeps Clerk users in sync with the database. Instead of trusting the frontend I put row-level security policies in Postgres, so even a buggy route can't leak another student's data. Payments go through Cashfree, and enrollment only activates from the verified webhook.",
    architecture: [
      "Clerk webhooks (svix-signed) create, update and delete users in Supabase. An `attachUser` middleware also creates the row if the webhook is late, so the first login never breaks.",
      "Cashfree `PAYMENT_SUCCESS_WEBHOOK` goes through `enrollmentService.verifyPayment()`, so the enrollment gets activated even if the browser never returns to `return_url`.",
      "Exam grading happens in SQL (`grade_mcq_response`): single/multiple choice, true/false, and numerical answers with a tolerance. Ranked results are upserted.",
      "A timer on the server auto-submits expired attempts every 2 minutes, so closing the tab doesn't stop the clock.",
      "`node-cron` runs fee reminders daily at 21:00 IST. They escalate from due-in-7-days to overdue, and a `reminder_log` table makes sure nobody gets the same reminder twice.",
      "Content files are served through signed URLs, and the admin API is split into sub-routers per area (fees, students, parents, teachers…).",
    ],
    gallery: [
      {
        src: "/projects/be-educated/gallery-courses.webp",
        alt: "Be Educated programs page with an active offline batch and a coming-soon online batch",
        caption: "The programs page. Live programs go straight to enrolment, and ones that aren't open yet show as coming soon.",
      },
      {
        src: "/projects/be-educated/gallery-fee-table.webp",
        alt: "Fee overview table listing monthly, annual and discounted prices for classes 6 to 12",
        caption: "The fee overview for every class. Clicking a row loads it into the fee calculator above it.",
      },
      {
        src: "/projects/be-educated/gallery-fee-plans.webp",
        alt: "Three payment plans: monthly, two installments, and one-time payment",
        caption: "Students pick one of three payment plans: monthly, two installments, or one-time.",
      },
      {
        src: "/projects/be-educated/gallery-signup.webp",
        alt: "Be Educated sign-up page secured by Clerk",
        caption: "Sign-up runs on Clerk. After signing up, an admin assigns the role (student, parent, teacher…) and that decides which dashboard you get.",
      },
      {
        src: "/projects/be-educated/gallery-faq.webp",
        alt: "FAQ page with a search box and topic filters",
        caption: "The FAQ page, with a search box and questions grouped by topic.",
      },
      {
        src: "/projects/be-educated/gallery-contact.webp",
        alt: "Contact page with an enquiry form next to a map",
        caption: "The contact page: an enquiry form next to the institute's location.",
      },
    ],
  },
  {
    slug: "iitbhu-distillation",
    name: "LightDep",
    group: "production",
    domainTag: "ML Research",
    oneLiner:
      "My research at IIT BHU: a 3.96 MB model that screens for depression from face and voice features right on the device. The paper got accepted at IEEE ANTS 2026.",
    githubUrl: "https://github.com/devansh101005/Depression_Detection_KD_Edge",
    period: "2026",
    image: {
      src: "/projects/iitbhu-distillation/cover.webp",
      alt: "LightDep architecture: visual and audio transformer streams fused late for classification",
      caption: "LightDep's architecture: two small transformers (face landmarks, voice features) fused late.",
      kind: "figure",
    },
    stack: [
      "PyTorch",
      "ONNX Runtime (+ Web)",
      "MediaPipe",
      "OpenFace",
      "Docker",
      "SciPy",
      "scikit-learn",
    ],
    highlights: [
      "Paper accepted at IEEE ANTS 2026 (IIT Roorkee). I'm joint first author.",
      "The deployed model is a 3.96 MB INT8 ONNX file, 28× smaller than the teacher it learned from. It runs in 96 ms on one CPU thread, and quantization cost no accuracy.",
      "75.9 binary F1 on D-Vlog, within 1.8 points of the best server-side models. The tiny 0.16M version still gets 75.4.",
      "Distillation lifted depression recall by +10.4 points (p = 0.045). A 10-seed rerun on a second GPU confirmed it on all four metrics (p ≤ 0.003 after Holm correction).",
      "The same file runs in a browser tab (217 ms), on an iPhone (223 ms) and on a mid-range Android phone (664 ms). Inference needs no server.",
    ],
    overview:
      "Most depression-detection models from papers are huge and need server-side tools like OpenFace to even produce their inputs, so they can't run on a phone. At IIT BHU I worked on shrinking that down: LightDep is a small two-stream transformer that learns from bigger teacher models (knowledge distillation) and then gets quantized for on-device use.\n\nIt comes in four sizes, from 0.16M to 6.36M parameters. It's a screening-risk indicator for research, not a diagnostic tool.",
    problem:
      "Two open questions. First, does distilling a big model into a tiny one actually help, or is it just a nice idea? Second, even with a tiny model, can a phone produce the same input features the model was trained on?",
    approach:
      "I trained the student from scratch and with distillation on two datasets (LMVD and D-Vlog), using the same seeds for both and paired significance tests, so a lucky seed couldn't fake a result. Then I exported the best model to ONNX, quantized it to INT8, and built a bridge that turns MediaPipe face landmarks (which run on phones) into the OpenFace format the model expects, to measure how much the predictions drift.",
    architecture: [
      "Two streams, visual (136-d landmarks) and audio (25-d acoustic features), each with its own small pre-norm transformer, then a fusion transformer and masked mean pooling.",
      "No positional encodings on purpose, so the model doesn't care about frame rate or clip length. Those are exactly what change between a research video and a phone recording.",
      "The distillation loss is cross-entropy plus a temperature-scaled KL term. Soft targets from the 5-model teacher ensemble are precomputed once.",
      "INT8 through ONNX dynamic quantization. PyTorch's eager INT8 breaks `nn.TransformerEncoder`'s fast path, so ONNX was the only clean route. torch↔ONNX outputs match to 3e-7.",
      "Modality-dropout training (randomly zeroing one stream) so the model still works when audio is missing. Visual-only F1 went from 0.0 to 69.7.",
      "OpenFace ran in an amd64 Docker image I built myself, because the public arm64 one wouldn't work on x86.",
      "Compared against logistic regression, an MLP, a GRU and a 1-D CNN under the same training. LightDep-M had the best accuracy and F1. The MLP came close on F1 (the gap isn't significant), but LightDep kept an accuracy edge when 30–50% of frames were dropped.",
    ],
    outcomes:
      "The main finding is that distillation only helps when the teacher is a stronger and well-calibrated screener. On D-Vlog it was, and distillation raised recall by +10.4 and F1 by +4.3. It also made training more stable across seeds, and on the best checkpoint it halved calibration error (ECE 0.076 → 0.038). On LMVD the teachers were poorly calibrated, and none of the 13 distillation variants I tried improved accuracy or F1 significantly. Distilling from one of them actually made recall worse.\n\nTwo things I caught along the way. While reproducing the MMFformer teacher I found its weight_decay default was 1e-3 instead of the paper's 0.1. And an early \"the model collapses without video\" result turned out to be a NaN bug from fully masking a modality, not real model behaviour.\n\nWhat's still open: the visual bridge works (prediction drift 0.041 on a 2-clip proof of concept), but there's no on-device replacement for the audio features yet, and audio is the stream the model relies on most.",
    gallery: [
      {
        src: "/projects/iitbhu-distillation/pareto.webp",
        alt: "Binary F1 versus parameter count for LightDep sizes with and without distillation",
        caption: "F1 vs model size. Distillation (solid line) lifts every size and flattens the curve. The 0.16M model gets 75.4 F1, close to the 3.67M one's 75.9 with 23× fewer parameters.",
        kind: "figure",
      },
      {
        src: "/projects/iitbhu-distillation/mechanism.webp",
        alt: "Bar charts of mean predicted depression probability and calibration error for scratch, KD and teacher",
        caption: "Why recall goes up: the student picks up the teacher's more sensitive operating point, and its calibration error halves (best checkpoints).",
        kind: "figure",
      },
    ],
  },
  {
    slug: "conquermanage",
    name: "ConquerManage",
    group: "production",
    domainTag: "Distributed Systems",
    oneLiner:
      "A small job queue. An Express producer pushes tasks into Redis, and a pool of workers picks them up, retries failures, and dead-letters the ones that keep failing.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/ConquerManage",
    period: "Mar 2026",
    image: {
      src: "/projects/conquermanage/cover-terminal.webp",
      alt: "Terminal: health checks and enqueue requests against the producer",
      caption: "Enqueueing tasks against the running stack.",
    },
    stack: ["TypeScript", "Node.js", "Express", "Redis", "ioredis", "Docker Compose"],
    overview:
      "I first wrote this in Go, then rewrote it in TypeScript to understand how the same producer/worker pattern works on Node's event loop. The producer takes `POST /enqueue`, validates the task and puts it in a Redis list. The worker service runs several loops that pull tasks and process them.\n\nThe task handlers (send_email, resize_image, generate_pdf) just log what they would do. The point was the queue, not the jobs.",
    problem:
      "Slow work like sending emails shouldn't block an HTTP request. It should go to the background, and if it fails it shouldn't just vanish.",
    approach:
      "Tasks get a UUID and are `RPUSH`ed onto a list. Workers `BLPOP` them, so there's no busy polling. A failed task goes back on the queue with one fewer retry, and once it's out of retries it goes to a dead-letter list where I can inspect it later.",
    architecture: [
      "Each worker loop gets its own Redis connection. A blocking `BLPOP` holds its connection while it waits, so loops sharing one client would just take turns.",
      "`BLPOP` blocks for at most 5s, then loops. There's no polling burning CPU, and a worker notices a shutdown within 5 seconds.",
      "Concurrency comes from `WORKER_CONCURRENCY` (default 3): N async loops started together.",
      "Failed tasks go back on the queue with `retries - 1`. At zero they're pushed to `task_queue:dead`.",
      "On SIGINT or SIGTERM it stops taking new work, lets in-flight tasks finish, then closes Redis, with an 8s cap so it finishes before Docker's 10s kill.",
      "Validation per task type, e.g. `send_email` needs `to` and `subject`.",
      "Docker Compose runs redis, the producer (:3000) and the worker (:3001, with `/health` and `/metrics`).",
    ],
    outcomes:
      "It runs end to end with Docker Compose (the gallery has a full run). The thing I didn't expect: `BLPOP` holds its connection while it waits, so real parallelism needs one Redis connection per worker loop.",
    gallery: [
      {
        src: "/projects/conquermanage/demo.webp",
        alt: "Terminal session: compose up, health checks, enqueue, validation error, metrics, compose down",
        caption: "A full run: compose up, health checks, a few tasks, one rejected by validation, then the worker's metrics.",
      },
      {
        src: "/projects/conquermanage/docker-build.webp",
        alt: "Terminal: docker compose up --build output",
        caption: "Building the producer and worker images.",
      },
    ],
  },
  {
    slug: "lockforge",
    name: "LockForge",
    group: "production",
    domainTag: "Distributed Systems",
    oneLiner:
      "A distributed lock service over HTTP. When several servers try to touch the same resource, exactly one gets the lock.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/LockForge",
    period: "Mar 2026",
    diagram: "lockforge",
    stack: ["TypeScript", "Node.js", "Express 5", "Redis", "ioredis", "Lua", "Docker"],
    overview:
      "A small REST API for acquiring, releasing, extending, checking and listing named locks, backed by Redis. I built it to properly understand atomic operations. It's the kind of thing you need when two servers might process the same order at the same time.",
    problem:
      "A lock across machines has to be atomic (two servers can't both win), owner-safe (you can't release someone else's lock), and it can't stay stuck forever if the holder crashes.",
    approach:
      "Acquiring is a single `SET key owner NX PX ttl`, and since Redis runs commands one at a time only one caller can win. Release and extend have to check the owner and then act, so I wrote them as Lua scripts that run inside Redis and can't be interrupted halfway. The TTL handles crashed holders.",
    architecture: [
      "`acquireLock()` is one `SET … NX PX` call. `null` means the lock is taken, and the API answers 409 with the current owner and `retry_after_ms`.",
      "`releaseLock()` runs a Lua script: `GET == owner` then `DEL`. That closes the gap where another process grabs the lock between my check and my delete.",
      "`extendLock()` does the same thing with `PEXPIRE`: only the owner can extend.",
      "`listLocks()` walks keys with `SCAN … MATCH lock:* COUNT 100` instead of `KEYS`, which would block Redis.",
      "Release returns 403 for \"not your lock\" and 404 for \"not locked\". A GET after the script tells the two apart.",
      "The default TTL is 30s, and it runs next to `redis:7-alpine` in Docker Compose.",
    ],
    outcomes:
      "All five operations (acquire, release, check, extend, list) work. `scripts/test-concurrent.sh` fires 5 acquire requests at the same moment to check that only one gets a 200.",
  },
  {
    slug: "limitron",
    name: "Limitron",
    group: "production",
    domainTag: "Backend / Systems",
    oneLiner:
      "A rate limiter written as Express middleware. It uses a sliding-window log in Redis and sets per-API-key limits by tier.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/Limitron",
    period: "Mar 2026",
    diagram: "limitron",
    stack: ["TypeScript", "Node.js", "Express", "Redis", "ioredis", "Docker"],
    overview:
      "Limitron sits in front of `/api/*` routes and throttles each API key (or IP when there's no key). Nginx and cloud gateways do this for you, but I wanted to build the algorithm myself and see how it actually works.",
    problem:
      "Without a limit, one client can flood an API. Fixed windows (say, reset every minute) let clients burst at the edges, so I went with a sliding window instead.",
    approach:
      "Every request is a timestamp in a Redis sorted set per client. On each request I remove timestamps older than the window (`ZREMRANGEBYSCORE`), count what's left (`ZCARD`), and either add the new one (`ZADD`) or reject with 429. Limits come from tiers stored in Redis hashes, so changing a key's plan doesn't need a deploy.",
    architecture: [
      "Sorted-set members are `randomUUID()`s with `Date.now()` as the score, so two requests in the same millisecond don't collide.",
      "`apikey:<key>` maps to a tier name, and `tier:<name>` holds `max_requests` and `window_seconds`.",
      "Every response gets `X-RateLimit-Limit/Remaining/Reset`. On a 429 it adds `Retry-After`, calculated from the oldest entry in the window.",
      "Mounted as `app.use('/api', limiter, router)`, so admin routes aren't throttled.",
      "`GET /api/status` shows how much of your window you've used without using up a request.",
      "Honest gap: prune, count and add are separate Redis calls, so two requests at the exact same moment can both get through. Wrapping them in `MULTI` or a Lua script (like I did in LockForge) would fix it.",
    ],
    outcomes:
      "It runs with Docker Compose next to `redis:7-alpine`, and the headers use the same `X-RateLimit-*` style as GitHub's API.",
  },
  {
    slug: "legal-rag",
    name: "VidhiVault",
    group: "production",
    domainTag: "GenAI",
    oneLiner:
      "Ask questions about Indian legal documents and get answers with citations. Retrieval is hybrid (vector + keyword) with reranking, built from scratch without LangChain.",
    status: "in-progress",
    githubUrl: "https://github.com/devansh101005/VidhiVault",
    period: "Apr 2026",
    diagram: "vidhivault",
    stack: [
      "FastAPI",
      "PostgreSQL + pgvector",
      "sentence-transformers",
      "Cross-encoder reranker",
      "Celery + Redis",
      "PyMuPDF",
      "pdfplumber",
      "Alembic",
    ],
    highlights: [
      "On my 24-query retrieval test, hybrid search raised recall@5 from 0.50 (vector only) to 0.64, and the reranker took it to 0.69.",
      "Graded 30 real questions by hand instead of trusting a vibe check.",
      "Everything runs on one Postgres: vectors (pgvector + HNSW) and full-text search in the same database.",
    ],
    overview:
      "A RAG backend for Indian legal PDFs (judgments and acts). You upload a PDF and a Celery worker parses it, splits it by legal sections, embeds the chunks and stores them. Then you can ask questions and get an answer that cites the chunks it used.\n\nI didn't use LangChain or LlamaIndex, because I wanted to see and measure every stage myself.",
    problem:
      "Legal questions come in two flavours: meaning-based (\"when does taking property become theft?\") and exact references (\"Section 439 CrPC\"). Vector search is bad at the second kind and keyword search is bad at the first.",
    approach:
      "Run both: pgvector cosine search and Postgres full-text search (`ts_rank_cd`), 20 candidates each, merged with Reciprocal Rank Fusion. Merging by rank means I don't have to make the two kinds of score comparable. A cross-encoder then reranks the merged list, and the top 5 chunks go to the LLM, which has to cite them as [Source N].",
    architecture: [
      "Reciprocal Rank Fusion with k = 60 over a pgvector HNSW cosine index and a `tsvector` column.",
      "Embeddings come from `all-MiniLM-L6-v2`. I resized chunks to 160 words with 25 overlap after finding the old 512-token chunks were being cut off at the model's 256-wordpiece limit (68% of them were).",
      "The chunker splits on legal headings (Section, Article, Order) first, then paragraphs, then sentences.",
      "`cross-encoder/ms-marco-MiniLM-L-6-v2` reranks the fused list down to 5.",
      "The LLM is called over an OpenAI-compatible API with async `httpx`. On a 429 it reads `Retry-After` and retries.",
      "Uploads are deduped by SHA-256 file hash, and document status moves pending → processing → completed/failed with the error saved.",
    ],
    outcomes:
      "Retrieval, 24 test queries, recall@5: vector only 0.50, keyword only 0.49, hybrid 0.64, hybrid + rerank 0.69. The reranker isn't free though. It's about 0.8s per query while every other stage is under 20ms, and it slightly lowered MRR.\n\nFull answers, 30 questions graded by hand: 14 good, 7 partial, 2 wrong, 6 correctly refused (the answer wasn't in the documents), and 1 wrongly refused. The backend works end to end. The frontend isn't built yet."
  },

  // ──────────── Group B — Experiments ────────────
  {
    slug: "whatsapp-chat-analysis",
    name: "WhatsApp Chat Analysis",
    group: "experiment",
    domainTag: "Data / Viz",
    oneLiner:
      "Upload a WhatsApp export and get stats, timelines, sentiment, topics and toxicity. It handles Hinglish chats too.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/whatsapp_chat_analysis",
    period: "Oct – Nov 2025",
    stack: [
      "Python",
      "Streamlit",
      "pandas",
      "scikit-learn",
      "Transformers",
      "gensim",
      "NetworkX",
      "PyVis",
    ],
    overview:
      "This started as a course project and I kept adding things. You upload an exported chat (Android and iPhone exports use different formats, and the parser handles both) and it shows activity stats, timelines, heatmaps, a word cloud with Hinglish stopwords removed, and emoji usage.\n\nThen the ML parts: sentiment, LDA topics, toxicity with Toxic-BERT, and a reply graph that shows who talks to whom.",
    problem:
      "Indian group chats are mostly Hinglish, and most sentiment models are trained on English tweets. That mismatch was the interesting part.",
    approach:
      "I trained Logistic Regression and LinearSVC on Sentiment140 (TF-IDF), and also added multilingual BERT. Messages that aren't in English get translated with deep-translator. On top of that there's a small hand-made Hinglish slang list that overrides the model for strong words it would otherwise get wrong.",
    architecture: [
      "Sentiment: LogReg / LinearSVC (TF-IDF, Sentiment140) plus `nlptown/bert-base-multilingual-uncased-sentiment`, with a Hinglish slang override.",
      "Topics with gensim LDA, toxicity with `unitary/toxic-bert`.",
      "Reply network with NetworkX, drawn interactively with PyVis.",
      "Hinglish stopword list for the word cloud, and deep-translator for non-English messages.",
      "pytest tests and a Dockerfile.",
    ],
    outcomes:
      "Test accuracy on Sentiment140: Logistic Regression 76.78% (trained on a 1M-tweet sample), LinearSVC 73.79% (trained on 50k; it overfits at 80.95% on train). On real Hinglish chats it's worse than that, because chat messages look nothing like tweets. I wrote that limitation into the README instead of hiding it.",
    gallery: [
      {
        src: "/projects/whatsapp-chat-analysis/features-positive.webp",
        alt: "Top positive words learned by the logistic regression model",
        caption: "The words the model thinks are most positive. All English tweet-speak (\"followfriday\"), which is exactly why Hinglish needed the slang override.",
        kind: "figure",
      },
      {
        src: "/projects/whatsapp-chat-analysis/features-negative.webp",
        alt: "Top negative words learned by the logistic regression model",
        caption: "And the most negative ones.",
        kind: "figure",
      },
    ],
  },
  {
    slug: "token-analyzer",
    name: "Token Analyzer",
    group: "experiment",
    domainTag: "GenAI",
    oneLiner:
      "A small Streamlit tool that counts tokens and estimates the cost of a prompt across 8 LLMs from OpenAI, Google and Anthropic.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/Token_Analyzer",
    period: "Nov – Dec 2025",
    stack: ["Python", "Streamlit", "tiktoken"],
    overview:
      "I kept guessing how many tokens my prompts were, so I made a one-page tool for it. Paste text (or a system + user prompt) and it shows the token count, the token IDs, how the text splits into tokens, and roughly what it would cost on each model.",
    problem:
      "Every provider tokenizes differently, and Gemini and Claude don't ship a local tokenizer, so you can't count their tokens exactly offline.",
    approach:
      "The 4 OpenAI models use tiktoken for exact counts. The 4 Gemini/Claude models use a ~4 characters per token estimate, and the app clearly says it's an estimate. Cost is tokens ÷ 1M × the price per 1M tokens.",
    architecture: [
      "One `MODEL_CONFIG` dict holds each model's tokenizer, provider, price per 1M and an exact-or-estimate flag.",
      "`get_tokenizer()` picks `get_encoding()` or `encoding_for_model()` depending on the model.",
      "The per-token breakdown is hidden for estimated models, since it would be made up.",
      "An optional side-by-side with the gpt-4o-mini tokenizer.",
    ],
    outcomes:
      "It does its job. The prices are hardcoded, though, so they go stale whenever a provider changes its pricing.",
  },

  // ──────────── Group C — A Tool I Built for Myself ────────────
  {
    slug: "twitx",
    name: "TwitX",
    group: "personal-tool",
    domainTag: "GenAI",
    oneLiner:
      "A drafting helper for tech posts. Twice a day it pulls what's trending on Reddit, Hacker News and GitHub, writes drafts in the user's own style, and sends them on Telegram for review. It never posts by itself.",
    status: "in-progress",
    githubUrl: "https://github.com/devansh101005/TwitX",
    period: "May – Jun 2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Groq",
      "Clerk",
      "Telegram Bot API",
      "GitHub Actions",
    ],
    overview:
      "Posting regularly about tech takes a lot of time just to find topics. TwitX runs a pipeline twice a day. It scrapes Reddit, Hacker News and GitHub, keeps what matches each user's topics, and asks an LLM to write drafts using that user's past posts as style examples. The drafts arrive on Telegram and the user decides what to post. It never posts on its own.",
    problem:
      "Finding topics and writing drafts every day takes too much time. The goal was help with drafting, not a bot that posts for you.",
    approach:
      "A simple relevance score cuts the scraped items down to the top 15 before anything goes to the LLM. The prompt includes the user's past posts and which drafts they liked or skipped. GitHub Actions runs the pipeline on a schedule, so no server has to run all day.",
    architecture: [
      "Relevance = keyword hits × 10 + log(upvotes + 1) × 5. The top 15 go to the LLM, which keeps the prompt small.",
      "On Vercel the function gets killed as soon as the HTTP response is sent, which would drop Telegram replies. A custom `dispatchUpdate` awaits every bot handler before responding.",
      "`parseDrafts` tries to parse the full JSON array first. If the model got cut off by `max_tokens`, it rescues whatever complete `{}` objects it can find.",
      "It uses Groq by default, but any OpenAI-compatible provider works by setting `AI_BASE_URL` / `AI_MODEL`, with no code changes.",
      "A GitHub Actions cron (09:00 and 19:00 UTC) runs the pipeline, which gets around Vercel's short function timeout.",
    ],
    outcomes:
      "The pipeline works end to end with Telegram. Discord delivery isn't implemented yet (it's just a stub).",
  },

  // ──────────── Group D — Guided Builds (Learning) ────────────
  {
    slug: "devx-ai",
    name: "DevX AI",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "An AI SaaS with six tools (article writer, blog titles, image generation, background/object removal, resume review), with Clerk auth and a free-tier limit.",
    status: "live",
    liveUrl: "https://devxaiclient.vercel.app",
    githubUrl: "https://github.com/devansh101005/AI-saas",
    period: "Oct 2025 – Mar 2026",
    image: {
      src: "/projects/devx-ai/cover.webp",
      alt: "DevX AI tools grid",
    },
    stack: [
      "React 19",
      "Express 5",
      "Neon Postgres",
      "Gemini",
      "Cloudinary",
      "ClipDrop",
      "Clerk",
      "Zod",
    ],
    overview:
      "I built this by following a tutorial to learn the React + Express + Clerk stack, then changed and deployed it myself. There are six tools: article writing, blog titles, text-to-image, background removal, object removal, and PDF resume review. Free users get 10 generations in total.",
    approach:
      "Gemini is called through the OpenAI SDK using Google's OpenAI-compatible URL. The free-tier counter lives in Clerk's `privateMetadata`, with a 60s in-memory cache so I'm not calling Clerk on every request.",
    architecture: [
      "Two rate limits: 105 requests per 15 min in general and 25 per 15 min on AI routes, with `trust proxy` set so Vercel's forwarded IP is used.",
      "Zod validates request bodies, and HTML is stripped from prompts before they reach any AI API.",
      "Image editing uses Cloudinary's `background_removal` and `gen_remove`. ClipDrop handles text-to-image.",
    ],
    outcomes:
      "Deployed as two Vercel projects (client and server). After the tutorial part was done, I came back and fixed the CORS, security and rate-limit problems that only showed up once it was running on serverless.",
  },
  {
    slug: "dentcare",
    name: "DentCare",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "A dental clinic app with appointment booking, email confirmations, an admin dashboard and a voice AI assistant.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/DentCare",
    period: "Nov – Dec 2025",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Vapi",
      "Resend",
      "TanStack Query",
    ],
    overview:
      "A guided build I did to learn Next.js server actions, Prisma and TanStack Query. Patients book appointments with dentists, get a confirmation email, and on a paid plan can talk to a voice assistant. An admin manages doctors and appointments.",
    architecture: [
      "Booked slots are checked against appointments with status CONFIRMED or COMPLETED, so the same slot can't be booked twice.",
      "The admin page is gated by comparing the signed-in email to `ADMIN_EMAIL` in a server component.",
      "The confirmation email is a React Email template sent through Resend.",
      "The voice assistant (Vapi) only shows up for users on a paid Clerk plan.",
    ],
  },
  {
    slug: "sellwell",
    name: "SellWell",
    group: "guided",
    domainTag: "Full-stack",
    guided: true,
    oneLiner:
      "A multi-vendor store. Sellers apply to open a shop, and buyers check out with Stripe or cash on delivery.",
    status: "built",
    githubUrl: "https://github.com/devansh101005/Sell-Well",
    period: "Dec 2025 – Jan 2026",
    stack: [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Stripe",
      "Inngest",
      "ImageKit",
      "Redux Toolkit",
    ],
    overview:
      "A guided build to learn Stripe webhooks and background jobs with Inngest. New stores stay pending until an admin approves them. A cart with products from several sellers gets split into one order per seller at checkout.",
    architecture: [
      "The Stripe webhook verifies the signature with `constructEvent`, then marks the orders paid or deletes them if checkout is cancelled.",
      "Clerk user events go to Inngest functions that keep the database in sync.",
      "Coupons can be restricted to new users or members (checked with Clerk `has({ plan: 'plus' })`).",
      "Uploading the first product image calls an OpenAI vision model to pre-fill the name and description.",
    ],
    outcomes:
      "The main flows work: store approval, Stripe checkout with webhook verification, and the Clerk-to-database sync through Inngest.",
  },
];

export const productionProjects = projects.filter((p) => p.group === "production");
export const experimentProjects = projects.filter((p) => p.group === "experiment");
export const personalToolProjects = projects.filter((p) => p.group === "personal-tool");
export const guidedProjects = projects.filter((p) => p.group === "guided");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
