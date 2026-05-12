"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { BackgroundAnimation } from "./background-animation"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [scrollVisible, setScrollVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), 300)
    const t2 = setTimeout(() => setSubtitleVisible(true), 1200)
    const t3 = setTimeout(() => setScrollVisible(true), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Animated tubes background */}
      <BackgroundAnimation />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-px w-24 bg-white/30 md:left-20 md:w-40" aria-hidden="true" />
      <div className="absolute top-20 right-10 h-px w-24 bg-white/30 md:right-20 md:w-40" aria-hidden="true" />
      <div className="absolute bottom-32 left-10 h-px w-16 bg-white/40 md:left-20 md:w-32" aria-hidden="true" />
      <div className="absolute bottom-32 right-10 h-px w-16 bg-white/40 md:right-20 md:w-32" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Episode marker */}
        <span
          className={`font-[var(--font-inter)] text-base font-bold tracking-[0.4em] uppercase text-white transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Presenting
        </span>

        {/* Drama Title */}
        <h1
          className={`text-5xl font-light leading-tight tracking-wide text-white transition-all duration-[1500ms] md:text-7xl lg:text-8xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="block text-balance">Rakesh Dora Madakam</span>
        </h1>

        {/* Divider */}
        <div
          className={`h-px w-20 bg-white/50 transition-all delay-500 duration-[1500ms] md:w-32 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <p
          className={`max-w-md font-[var(--font-inter)] text-lg font-bold leading-relaxed tracking-wider text-white transition-all duration-[1500ms] md:text-xl ${
            subtitleVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          A journey of code, creativity, and curiosity
        </p>

        {/* Role tag */}
        <span
          className={`rounded-full border border-white/20 bg-black/60 px-6 py-2 font-[var(--font-inter)] text-sm font-bold tracking-widest uppercase text-white backdrop-blur-sm transition-all duration-[1500ms] ${
            subtitleVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Software Developer & Cloud Enthusiast
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          scrollVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
          aria-label="Scroll to About section"
        >
          <span className="font-[var(--font-inter)] text-sm font-bold tracking-[0.3em] uppercase">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
