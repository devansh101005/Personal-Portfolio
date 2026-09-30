/**
 * Limitron — sliding-window log on one Redis sorted set per key:
 * evict old timestamps (ZREMRANGEBYSCORE), count (ZCARD), then ZADD or 429.
 */
export default function LimitronDiagram() {
  const old = [170, 270, 360];
  const inWindow = [640, 790, 930, 1090, 1240];

  return (
    <svg viewBox="0 0 1600 900" className="dg" role="img" aria-label="Sliding window rate limiter: timestamps older than the window are evicted, the rest are counted, and the new request is added or rejected with 429">
      <text x="80" y="110" className="t-label">rate:&lt;api-key or ip&gt; · sorted set, score = Date.now()</text>

      {/* the window */}
      <rect x="560" y="330" width="900" height="180" rx="12" className="window" />
      <text x="580" y="310" className="t-label acc">window_seconds</text>
      <line x1="1460" y1="250" x2="1460" y2="560" className="now" />
      <text x="1415" y="235" className="t-label">now</text>

      {/* timeline */}
      <line x1="100" y1="420" x2="1500" y2="420" className="wire" />

      {old.map((x) => (
        <g key={x} className="evicted">
          <circle cx={x} cy="420" r="16" className="dot-old" />
          <line x1={x - 22} y1="398" x2={x + 22} y2="442" className="strike" />
        </g>
      ))}
      <text x="110" y="500" className="t-mono muted">ZREMRANGEBYSCORE</text>
      <text x="110" y="540" className="t-mono muted">0 … now − window</text>

      {inWindow.map((x) => (
        <circle key={x} cx={x} cy="420" r="16" className="dot" />
      ))}
      <circle cx="1390" cy="420" r="20" className="dot-new" />
      <text x="1310" y="475" className="t-mono acc">ZADD</text>
      <text x="640" y="475" className="t-mono">ZCARD</text>

      {/* decision */}
      <line x1="80" y1="640" x2="1520" y2="640" className="rule" />
      <text x="80" y="720" className="t-mono">count &lt; max_requests</text>
      <text x="560" y="720" className="t-mono acc">→ 200 · X-RateLimit-Remaining</text>
      <text x="80" y="790" className="t-mono">otherwise</text>
      <text x="560" y="790" className="t-mono muted">→ 429 · Retry-After (oldest entry + window − now)</text>
    </svg>
  );
}
