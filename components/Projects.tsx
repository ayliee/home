import { projects } from "@/lib/data";

/** how many repos to surface on the page */
const SHOWN = 3;
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
    </svg>
  );
}

function GithubMark({ className }: { className?: string }) {
  // simple octocat-free mark: rounded square + code brackets
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-10 sm:py-14">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <h2 className="section-title">Projects</h2>
          <a
            href="https://github.com/ayliee"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
          >
            github.com/ayliee
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="rule mt-2" />
      </Reveal>

      <div className="no-bar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:gap-7">
        {projects.slice(0, SHOWN).map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.07}
            className={`w-[76vw] shrink-0 snap-center sm:w-auto ${
              i % 3 === 1 ? "lg:mt-6" : ""
            }`}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              style={{ ["--rot" as string]: `${p.rotate}deg` }}
              className="group flex h-full rotate-[var(--rot)] flex-col rounded-[3px] bg-white p-2.5 pb-4 shadow-polaroid transition-[transform,box-shadow] duration-500 ease-out hover:z-20 hover:rotate-0 hover:-translate-y-2 hover:shadow-polaroidHover focus-visible:rotate-0 sm:p-3"
            >
              {/* cover */}
              <span
                className="relative flex aspect-[4/2.6] w-full items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${p.langColor}22, ${p.langColor}66)`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.4) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <GithubMark className="relative h-10 w-10 text-ink/70 transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute bottom-2 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[0.6rem] text-ink">
                  <StarIcon className="h-3 w-3" /> {p.stars}
                </span>
              </span>

              <span className="mt-3 flex items-baseline justify-between gap-2">
                <span className="font-hand text-[1.3rem] leading-none text-ink">{p.name}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.langColor }}
                  />
                  {p.language}
                </span>
              </span>

              <span className="mt-1.5 block font-mono text-[0.72rem] leading-relaxed text-muted">
                {p.description}
              </span>

              <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                View repo
                <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
