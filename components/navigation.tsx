"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/30 bg-background/80 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className={`text-xl font-bold tracking-wider transition-colors ${
            scrolled ? "text-[rgb(115,157,125)]" : "text-white/80"
          }`}
        >
          Portfolio
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-[var(--font-inter)] text-sm font-bold tracking-widest uppercase text-[rgb(115,157,125)] transition-colors hover:text-[rgb(115,157,125)]/80"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-px w-6 bg-white transition-all ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex flex-col items-center gap-6 border-t border-border/30 bg-background/95 px-6 py-8 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[var(--font-inter)] text-base font-bold tracking-widest uppercase text-[rgb(115,157,125)] transition-colors hover:text-[rgb(115,157,125)]/80"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
