"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl">
        {/* Episode tag */}
        <div
          className={`mb-10 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-sage/40" aria-hidden="true" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-sage">
            Episode 01
          </span>
        </div>

        {/* Title */}
        <h2
          id="about-heading"
          className={`mb-8 text-3xl font-light tracking-wide text-foreground transition-all delay-200 duration-1000 md:text-4xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          My Story
        </h2>

        {/* Story card */}
        <div
          className={`rounded-2xl border border-border/50 bg-card/70 p-8 shadow-sm backdrop-blur-sm transition-all delay-400 duration-1000 md:p-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-6 font-[var(--font-inter)] text-sm font-light leading-relaxed text-foreground/80 md:text-base">
            My journey in technology began with a simple but powerful question: how can software be used to solve real problems and create meaningful impact? What started as curiosity soon evolved into a deep commitment to building systems that are both technically robust and genuinely useful.
          </p>
          <p className="mb-6 font-[var(--font-inter)] text-sm font-light leading-relaxed text-foreground/80 md:text-base">
            I am Rakesh Dora, a Computer Science Engineer focused on designing scalable, practical, and human-centered software solutions. My work spans full-stack development, cloud computing, secure systems, and data-driven applications. From financial management platforms like NestLedger and banking systems such as Dora Bank to community-focused solutions like Campus Connect and the Village Ride Planner, each project reflects my belief that technology should address real-world challenges and improve everyday lives.
          </p>
          <p className="mb-6 font-[var(--font-inter)] text-sm font-light leading-relaxed text-foreground/80 md:text-base">
            I approach software engineering as both a technical discipline and a creative endeavor. Beyond writing code, I enjoy architecting solutions, optimizing performance, and transforming complex ideas into intuitive products. Whether implementing secure file storage systems, building social platforms, or developing applications for underserved communities, I strive to create software that is reliable, scalable, and impactful.
          </p>
          <p className="font-[var(--font-inter)] text-sm font-light leading-relaxed text-foreground/80 md:text-base">
            This portfolio represents more than a collection of projects. It is a record of continuous learning, disciplined problem-solving, and a long-term vision to leverage technology at scale. My goal is to build systems that influence industries, empower communities, and contribute to shaping a better future through innovation.
          </p>
        </div>

        {/* Decorative quote */}
        <div
          className={`mt-10 flex justify-center transition-all delay-700 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="max-w-sm text-center text-lg font-light italic tracking-wide text-sage/70">
            {'"The best code is written with the heart, not just the mind."'}
          </p>
        </div>
      </div>
    </section>
  )
}
