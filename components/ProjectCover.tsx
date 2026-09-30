import Image from "next/image";
import Diagram from "./diagrams";
import type { Project } from "@/content/types";

/**
 * A project's cover, in priority order: screenshot/figure → SVG diagram →
 * serif-initial placeholder (§5 empty state). Fills its (positioned) parent.
 */
export default function ProjectCover({
  p,
  sizes,
  priority = false,
}: {
  p: Project;
  sizes: string;
  priority?: boolean;
}) {
  if (p.image) {
    const figure = p.image.kind === "figure";
    return (
      <Image
        src={p.image.src}
        alt={p.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${figure ? "plate object-contain" : "object-cover object-top"}`}
      />
    );
  }
  if (p.diagram) return <Diagram id={p.diagram} />;
  return (
    <span className="flex h-full w-full items-center justify-center font-display text-[56px] font-black text-line-strong">
      {p.name.charAt(0)}
    </span>
  );
}
