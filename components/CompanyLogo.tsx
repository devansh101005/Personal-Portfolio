import Image from "next/image";

/**
 * Organization logo on a small white plate (§1: hairline border + surface, no
 * glow). The plate stays white in dark mode too, so official logos keep their
 * real colors — like a printed badge. Lifts 1px when its row is hovered.
 */
export default function CompanyLogo({
  src,
  alt,
  size = 44,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-line bg-white p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_6px_14px_-8px_rgba(0,0,0,0.18)] transition-[transform,border-color] duration-300 group-hover:-translate-y-px group-hover:border-line-strong dark:border-transparent dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
