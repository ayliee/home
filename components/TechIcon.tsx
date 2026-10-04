import { brandPaths } from "@/lib/brandPaths";

export type TechSlug =
  | keyof typeof brandPaths
  | "procreate"
  | "ibispaint"
  | "alightmotion"
  | "pixellab";

type Props = { slug: TechSlug; className?: string };

/**
 * Renders a 24x24 monochrome SVG glyph for a tech/software.
 * Official marks come from simple-icons path data; the four tools with no
 * official mark get hand-drawn glyphs below.
 */
export default function TechIcon({ slug, className }: Props) {
  const svg = { viewBox: "0 0 24 24", className, "aria-hidden": true } as const;

  if (slug in brandPaths) {
    return (
      <svg {...svg} fill="currentColor">
        <path d={brandPaths[slug as keyof typeof brandPaths]} />
      </svg>
    );
  }

  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    // Procreate: brush and pencil
    case "procreate":
      return (
        <svg {...svg} {...stroke}>
          <path d="M4 20c0-2.4 1.3-3.6 3.2-3.6A2.6 2.6 0 0 1 9.8 19c0 1.7-1.5 2.9-3.4 2.9H3" />
          <path d="M9 16 18.4 5.2a2 2 0 0 1 3 2.6L11 18" />
          <path d="M15.8 6.6 19 9.4" />
        </svg>
      );
    // Ibis Paint X: paint droplet over a canvas
    case "ibispaint":
      return (
        <svg {...svg} {...stroke}>
          <path d="M12 3.2c2.9 3.3 4.8 5.8 4.8 8.2A4.8 4.8 0 0 1 12 16.2a4.8 4.8 0 0 1-4.8-4.8c0-2.4 1.9-4.9 4.8-8.2Z" />
          <path d="M4 20.5h16" />
          <path d="M9.6 11.6a2.4 2.4 0 0 0 2.4 2.3" />
        </svg>
      );
    // Alight Motion: keyframe diamonds on a timeline
    case "alightmotion":
      return (
        <svg {...svg} {...stroke}>
          <path d="M3 12h4.2M10.8 12h2.4M16.8 12H21" />
          <path d="m9 9 3 3-3 3-3-3 3-3Z" />
          <path d="m18 8.4 2.6 2.6-2.6 2.6-2.6-2.6L18 8.4Z" opacity=".55" />
          <path d="M3 5.5v13" />
        </svg>
      );
    // PixelLab: pixel blocks
    case "pixellab":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M3 3h5v5H3zM10 3h5v5h-5zM17 10h4v5h-4zM10 10h5v5h-5zM3 16h5v5H3zM10 16h5v5h-5z" />
          <path d="M17 3h4v5h-4z" opacity=".45" />
          <path d="M3 10h5v5H3z" opacity=".45" />
        </svg>
      );
    default:
      return null;
  }
}
