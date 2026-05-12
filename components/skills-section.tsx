"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "Python", level: 75 },
  { name: "Java", level: 70 },
  { name: "SQL", level: 75 },
]

const tools = [
  "Git & GitHub",
  "VS Code",
  "AWS Basics",
  "Docker",
  "Figma",
  "Linux",
  "REST APIs",
  "Firebase",
]

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-card/50 px-6 py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-3xl">
        {/* Episode tag */}
        <div
          className={`mb-10 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-peach/60" aria-hidden="true" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-peach">
            Episode 02
          </span>
        </div>

        {/* Title */}
        <h2
          id="skills-heading"
          className={`mb-12 text-3xl font-light tracking-wide text-foreground transition-all delay-200 duration-1000 md:text-4xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          What I Know
        </h2>

        {/* Languages */}
        <div
          className={`mb-12 transition-all delay-300 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="mb-6 font-[var(--font-inter)] text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Languages
          </h3>
          <div className="flex flex-col gap-5">
            {skills.map((skill, i) => (
              <div key={skill.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-inter)] text-sm font-light text-foreground/80">
                    {skill.name}
                  </span>
                  <span className="font-[var(--font-inter)] text-xs text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full rounded-full bg-sage/60 transition-all duration-[2000ms] ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${400 + i * 150}ms`,
                    }}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud & tools */}
        <div
          className={`transition-all delay-700 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="mb-6 font-[var(--font-inter)] text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Cloud & Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <span
                key={tool}
                className="rounded-full border border-border/50 bg-card px-4 py-2 font-[var(--font-inter)] text-xs font-light text-foreground/70 transition-all hover:border-sage/40 hover:text-sage"
                style={{
                  transitionDelay: isVisible ? `${800 + i * 100}ms` : "0ms",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
