import Image from "next/image";
import { education, experience, profile, software } from "@/lib/data";
import Reveal from "./Reveal";
import { Sparkle } from "./Icons";
import TechIcon from "./TechIcon";

export default function Hero() {
  return (
    <section id="about" className="scroll-mt-24 pb-6 pt-6 sm:pt-10">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] lg:gap-12">
        {/* left column: portrait and handwritten intro */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="relative -rotate-2 bg-white p-3 pb-16 shadow-polaroid transition-transform duration-500 hover:rotate-0 sm:p-4 sm:pb-20">
              <span className="tape -top-3 left-1/2 -translate-x-1/2" />
              <div className="relative aspect-square w-full overflow-hidden bg-paper2">
                <Image
                  src={profile.portrait}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 34vw"
                  className="object-cover"
                />
              </div>
              <p className="absolute bottom-4 left-4 font-hand text-xl text-ink/70 sm:text-2xl">
                {profile.location}
              </p>
            </div>

            <div className="relative mt-6 pl-1">
              <span className="font-hand text-4xl font-bold text-lime drop-shadow-[1px_1px_0_rgba(0,0,0,.15)] sm:text-5xl">
                Look Here!
              </span>
              <p className="mt-1 max-w-[30ch] -rotate-1 font-hand text-[1.35rem] leading-snug text-ink/85 sm:text-2xl">
                {profile.intro}
              </p>
              <Sparkle className="absolute -right-1 top-2 h-5 w-5 animate-floaty text-lime" />
            </div>
          </div>
        </Reveal>

        {/* right column: name and resume blocks */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h1 className="font-script text-[3.2rem] leading-[0.95] sm:text-7xl lg:text-[5.4rem]">
              {profile.name}
            </h1>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted sm:text-xs">
              {profile.role}
            </p>
          </Reveal>

          <Block title="Education" delay={0.05}>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.school} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <div className="flex w-full flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-mono text-sm leading-relaxed">
                      {e.school}
                      <span className="block text-muted">{e.detail}</span>
                    </p>
                    <span className="font-mono text-xs text-muted">{e.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Tech Stack & Softwares" id="skills" delay={0.1}>
            <ul className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 sm:gap-x-3 lg:grid-cols-6">
              {software.map((s) => (
                <li
                  key={s.name}
                  className="group/soft flex flex-col items-center gap-1.5 text-center"
                >
                  <span
                    style={{ color: s.color }}
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-line/80 bg-white shadow-[0_6px_14px_-8px_rgba(20,20,20,.5)] transition-transform duration-300 group-hover/soft:-translate-y-1 group-hover/soft:rotate-6 sm:h-12 sm:w-12"
                  >
                    <TechIcon slug={s.slug} className="h-6 w-6 sm:h-[26px] sm:w-[26px]" />
                  </span>
                  <span className="font-mono text-[0.58rem] uppercase leading-tight tracking-[0.08em] text-muted">
                    {s.name}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Experience" id="experience" delay={0.15}>
            <ul className="space-y-3">
              {experience.map((x) => (
                <li key={x.org} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <p className="font-mono text-sm italic leading-relaxed">
                    {x.org}
                    {x.role || x.note ? (
                      <span className="block not-italic text-muted">
                        {x.role ? `Role: ${x.role}` : x.note}
                        {x.role && x.note ? ` · ${x.note}` : ""}
                      </span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>
    </section>
  );
}

function Block({
  title,
  id,
  delay,
  children,
}: {
  title: string;
  id?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div id={id} className="mt-8 scroll-mt-24">
        <h2 className="font-mono text-xl tracking-[0.1em] sm:text-2xl">{title}</h2>
        <div className="rule mb-4 mt-1.5" />
        {children}
      </div>
    </Reveal>
  );
}
