/**
 * LockForge — what scripts/test-concurrent.sh shows: 5 servers race for one
 * lock, Redis `SET NX PX` lets exactly one through (200), the rest get 409.
 */
export default function LockForgeDiagram() {
  const servers = [1, 2, 3, 4, 5];
  const y = (i: number) => 190 + i * 118;

  return (
    <svg viewBox="0 0 1600 900" className="dg" role="img" aria-label="Five servers request the same lock; Redis SET NX PX grants it to one and the rest get 409">
      <text x="80" y="110" className="t-label">POST /lock/contested-resource · 5 requests at once</text>

      {servers.map((n, i) => {
        const cy = y(i) + 40;
        const win = n === 1;
        return (
          <g key={n}>
            <rect x="80" y={y(i)} width="300" height="80" rx="10" className={win ? "box box-acc" : "box"} />
            <text x="115" y={cy + 11} className={win ? "t-mono acc" : "t-mono"}>server-{n}</text>
            <path
              d={`M380 ${cy} C 500 ${cy}, 520 450, 640 450`}
              className={win ? "flow" : "wire"}
            />
            <text x="1180" y={cy + 11} className={win ? "t-mono acc" : "t-mono muted"}>
              {win ? "200 · acquired" : "409 · held"}
            </text>
            <path d={`M1100 450 C 1130 450, 1130 ${cy}, 1160 ${cy}`} className={win ? "flow" : "wire"} />
          </g>
        );
      })}

      <rect x="640" y="300" width="460" height="300" rx="14" className="box box-strong" />
      <text x="680" y="360" className="t-label">REDIS · single-threaded</text>
      <text x="675" y="438" className="t-serif-sm">lock:contested-resource</text>
      <text x="680" y="500" className="t-mono">SET … <tspan className="acc">NX PX</tspan> 30000</text>
      <text x="680" y="560" className="t-mono muted">owner = server-1</text>

      <line x1="80" y1="800" x2="1520" y2="800" className="rule" />
      <text x="80" y="852" className="t-mono muted">release / extend → Lua: if GET == owner then DEL / PEXPIRE</text>
    </svg>
  );
}
