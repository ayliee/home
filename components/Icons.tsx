import type { SVGProps } from "react";
import { brandPaths } from "@/lib/brandPaths";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.3 6a1.2 1.2 0 0 0 1.4 0L21 7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.3 3.5h3l1.6 4-2 1.4a12.5 12.5 0 0 0 6.2 6.2l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.3 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={brandPaths.discord} />
    </svg>
  );
}

export const iconMap = {
  mail: MailIcon,
  phone: PhoneIcon,
  discord: DiscordIcon,
  instagram: InstagramIcon,
};

/** Hand-drawn doodle of a laptop, used as decoration near the footer. */
export function LaptopDoodle(props: IconProps) {
  return (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M26 12h62v44H26z" />
      <path d="M32 6h62v44" />
      <path d="M88 12 94 6M88 56l6-6" />
      <path d="M14 70h86l-8-14H26L14 70Z" />
      <path d="M48 63h18" />
      <path d="M34 20h30M34 28h42M34 36h22" opacity=".55" />
    </svg>
  );
}

/** Small star sparkle doodle. */
export function Sparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z" />
    </svg>
  );
}
