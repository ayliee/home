import { profile, socials } from "@/lib/data";
import { iconMap, LaptopDoodle, ArrowIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line/70 py-12 sm:py-16">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted">
            Let&apos;s work together
          </p>
          <h2 className="mt-2 font-script text-5xl leading-tight sm:text-6xl">Say hello</h2>

          <ul className="mt-7 space-y-4">
            {socials.map((s) => {
              const Icon = iconMap[s.icon];
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm tracking-wide underline-offset-4 group-hover:underline sm:text-base">
                    {s.value}
                  </span>
                  {s.href ? (
                    <ArrowIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  ) : (
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
                      {s.label}
                    </span>
                  )}
                </>
              );

              return (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target={s.external ? "_blank" : undefined}
                      rel={s.external ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-3"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="group inline-flex select-text items-center gap-3">
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={`mailto:${socials[0].value}`}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Hire me <ArrowIcon className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="justify-self-center">
          <LaptopDoodle className="h-40 w-auto animate-floaty text-ink/70 sm:h-56" />
        </Reveal>
      </div>

      <p className="mt-12 text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
        © {new Date().getFullYear()} {profile.name} · built with Next.js
      </p>
    </section>
  );
}
