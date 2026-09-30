/**
 * VidhiVault — the query path as it exists in app/core/retriever.py:
 * vector + keyword search in the same Postgres → RRF (k=60) → cross-encoder → LLM.
 */
export default function VidhiVaultDiagram() {
  return (
    <svg viewBox="0 0 1600 900" className="dg" role="img" aria-label="Query goes to pgvector and Postgres full-text search in parallel, results are merged with reciprocal rank fusion, reranked by a cross-encoder, and the top chunks go to the LLM for a cited answer">
      <text x="80" y="110" className="t-label">one Postgres · no LangChain · every stage measurable</text>

      {/* query */}
      <rect x="60" y="380" width="300" height="140" rx="12" className="box box-strong" />
      <text x="88" y="440" className="t-label">QUERY</text>
      <text x="88" y="488" className="t-serif-sm">s. 439 CrPC?</text>

      {/* branches */}
      <path d="M360 450 C 385 450, 385 260, 410 260" className="flow" />
      <path d="M360 450 C 385 450, 385 640, 410 640" className="flow" />

      <rect x="410" y="190" width="510" height="140" rx="12" className="box" />
      <text x="440" y="250" className="t-mono">pgvector · cosine</text>
      <text x="440" y="295" className="t-mono muted">HNSW · MiniLM-L6</text>

      <rect x="410" y="570" width="510" height="140" rx="12" className="box" />
      <text x="440" y="630" className="t-mono">tsvector · ts_rank_cd</text>
      <text x="440" y="675" className="t-mono muted">exact section numbers</text>

      <path d="M920 260 C 945 260, 945 450, 970 450" className="flow" />
      <path d="M920 640 C 945 640, 945 450, 970 450" className="flow" />

      {/* fusion */}
      <rect x="970" y="380" width="170" height="140" rx="12" className="box box-acc" />
      <text x="996" y="440" className="t-mono acc">RRF</text>
      <text x="996" y="485" className="t-mono muted">k = 60</text>

      <path d="M1140 450 L 1180 450" className="flow" />

      <rect x="1180" y="380" width="370" height="140" rx="12" className="box" />
      <text x="1208" y="440" className="t-mono">cross-encoder</text>
      <text x="1208" y="485" className="t-mono muted">rerank → top 5</text>

      <path d="M1365 520 L 1365 610" className="flow" />

      <rect x="1060" y="610" width="490" height="140" rx="12" className="box box-strong" />
      <text x="1090" y="670" className="t-mono">LLM → answer</text>
      <text x="1090" y="715" className="t-mono muted">cites [Source N]</text>

      <line x1="80" y1="800" x2="1550" y2="800" className="rule" />
      <text x="80" y="852" className="t-mono muted">ingest: PDF → section-aware chunks (160 words) → embed → pgvector</text>
    </svg>
  );
}
