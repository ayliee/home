import type { TechSlug } from "@/components/TechIcon";

export type EducationItem = {
  school: string;
  detail: string;
  year: string;
};

export type ExperienceItem = {
  org: string;
  /** optional, some entries are projects rather than job titles */
  role?: string;
  note?: string;
};

export type SocialLink = {
  label: string;
  value: string;
  href?: string;
  icon: "mail" | "phone" | "discord" | "instagram";
  /** entries without a href render as plain, selectable text */
  external?: boolean;
};

export const profile = {
  name: "Maham Afzal",
  /** Short wordmark shown in the nav bar. */
  navName: "Ayle",
  role: "Graphic Designer · Developer · UI/UX",
  location: "Lahore, Pakistan",
  intro:
    "Hi, I love to experiment with visuals to deliver creativity and would love to show my skill sets and ideas to your projects.",
  portrait: "/portrait.jpg",
};

export const education: EducationItem[] = [
  {
    school: "UET KSK Campus",
    detail: "Food Science Technologist",
    year: "2020",
  },
  {
    school: "KIPS Girls Campus",
    detail: "Nawab Town",
    year: "2017",
  },
];

export type Tech = {
  name: string;
  /** maps to a glyph in components/TechIcon.tsx */
  slug: TechSlug;
  color: string;
};

export const software: Tech[] = [
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "JavaScript", slug: "javascript", color: "#C9A227" },
  { name: "Python", slug: "python", color: "#306998" },
  { name: "Node.js", slug: "node", color: "#5FA04E" },
  { name: "Figma", slug: "figma", color: "#F24E1E" },
  { name: "Procreate", slug: "procreate", color: "#1F1F22" },
  { name: "Canva", slug: "canva", color: "#00AEB8" },
  { name: "Picsart", slug: "picsart", color: "#C209C1" },
  { name: "Ibis Paint X", slug: "ibispaint", color: "#2B6CB0" },
  { name: "Alight Motion", slug: "alightmotion", color: "#E8453C" },
  { name: "PixelLab", slug: "pixellab", color: "#D97706" },
];

export const experience: ExperienceItem[] = [
  { org: "The Trust School", role: "Senior Graphic Designer" },
  {
    org: "AeroX Dev",
    note: "Self owned Discord server with 7k+ members",
  },
  { org: "Freelancer", note: "Since 2025" },
];

export type Project = {
  name: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  url: string;
  rotate: number;
};

/** Pulled from github.com/ayliee (top repos by stars). */
export const projects: Project[] = [
  {
    name: "Monochrome",
    description:
      "Web based music player using Lavalink for streaming and LrcLib for live lyrics.",
    language: "JavaScript",
    langColor: "#F0C808",
    stars: 9,
    url: "https://github.com/ayliee/Monochrome",
    rotate: -3,
  },
  {
    name: "Verifier-Bot",
    description: "A YouTube subscription verifier bot for your Discord server.",
    language: "JavaScript",
    langColor: "#F0C808",
    stars: 6,
    url: "https://github.com/ayliee/Verifier-Bot",
    rotate: 2,
  },
  {
    name: "mefolio",
    description:
      "Modern web portfolio built with the Lanyard API, fetching Discord status in real time.",
    language: "TypeScript",
    langColor: "#3178C6",
    stars: 3,
    url: "https://github.com/ayliee/mefolio",
    rotate: -2,
  },
  {
    name: "Status-Bot",
    description:
      "Discord bot showing any Minecraft server status in real time with Components V2.",
    language: "JavaScript",
    langColor: "#F0C808",
    stars: 3,
    url: "https://github.com/ayliee/Status-Bot",
    rotate: 3,
  },
  {
    name: "Dlp-Wrapper",
    description:
      "REST API for web and Discord apps to extract media from 1.7k+ sources.",
    language: "JavaScript",
    langColor: "#F0C808",
    stars: 2,
    url: "https://github.com/ayliee/Dlp-Wrapper",
    rotate: -2.5,
  },
];

export const socials: SocialLink[] = [
  {
    label: "Email",
    value: "arcticayl@gmail.com",
    href: "mailto:arcticayl@gmail.com",
    icon: "mail",
  },
  { label: "Discord", value: "alyfinnn", icon: "discord" },
  {
    label: "Instagram",
    value: "@alyfinnn",
    href: "https://instagram.com/alyfinnn",
    icon: "instagram",
    external: true,
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Presence", href: "#presence" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
