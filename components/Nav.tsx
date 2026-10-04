"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        solid ? "border-b border-line/70 bg-paper/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="font-script text-2xl leading-none sm:text-3xl">
          {profile.navName}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-lime after:transition-all hover:after:w-full"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span className={`block h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-[2px] w-6 bg-ink transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`grid overflow-hidden border-line/70 bg-paper/95 backdrop-blur-md transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="min-h-0">
          {navItems.map((n) => (
            <li key={n.href} className="border-t border-line/60 first:border-t-0">
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 font-mono text-xs uppercase tracking-[0.2em]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
