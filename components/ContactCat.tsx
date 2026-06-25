/**
 * Easter-egg ASCII cat (REVISION-04). Fully self-contained — markup + styles in
 * one file. Curled up asleep by default; stretches awake on hover/focus via a
 * pure-CSS cross-fade (no JS, no canvas). Decorative (aria-hidden), muted (never
 * accent), static under reduced-motion. Removing this file + its import + render
 * line leaves the Contact section perfectly intact.
 */
const SLEEP = [
  "       |\\      _,,,---,,_",
  "  ~zzz /,`.-'`'    -.  ;-;;,_",
  "       |,4-  ) )-,_..;\\ (  `'-'",
  "      '---''(_/--'  `-'\\_)",
].join("\n");

const AWAKE = [
  "        /\\_/\\",
  "       ( o.o )",
  "    ~<(   ^   )>~",
  "       u     u",
].join("\n");

export default function ContactCat() {
  return (
    <div className="contact-cat" aria-hidden="true">
      <pre className="cat-sleep">{SLEEP}</pre>
      <pre className="cat-awake">{AWAKE}</pre>
      <style>{`
        .contact-cat{position:relative;display:inline-block;width:max-content}
        .contact-cat pre{margin:0;font-family:var(--font-mono),ui-monospace,monospace;font-size:12.5px;line-height:1.35;color:var(--muted)}
        .contact-cat .cat-sleep{opacity:.55;transition:opacity .45s ease}
        .contact-cat .cat-awake{position:absolute;inset:0;opacity:0;transition:opacity .45s ease}
        .contact-cat:hover .cat-sleep,.contact-cat:focus-within .cat-sleep{opacity:0}
        .contact-cat:hover .cat-awake,.contact-cat:focus-within .cat-awake{opacity:.7}
        @media (prefers-reduced-motion: reduce){
          .contact-cat .cat-awake{display:none}
          .contact-cat .cat-sleep{opacity:.55!important;transition:none}
        }
      `}</style>
    </div>
  );
}
