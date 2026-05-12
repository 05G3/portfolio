"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Village Ride Planner",
    description:
      "A smart transportation planning system designed to help people in rural areas find and coordinate rides efficiently. The platform focuses on improving accessibility, reducing travel costs, and connecting underserved communities.",
    tags: [
      "Python",
      "Flask",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Google Maps API"
    ],
    link: "#",
  },
  {
    title: "Dora Bank",
    description:
      "A comprehensive banking management system that simulates real-world banking operations such as account creation, deposits, withdrawals, transfers, and transaction history using object-oriented programming principles.",
    tags: [
      "Java",
      "Swing",
      "File Handling",
      "OOP",
      "Exception Handling"
    ],
    link: "https://dora-bank-app.netlify.app",
  },
  {
    title: "NestLedger",
    description:
      "A modern expense tracking and financial management application that helps users monitor spending, categorize expenses, and visualize financial patterns through interactive dashboards and analytics.",
    tags: [
      "Python",
      "Flask",
      "MySQL",
      "Bootstrap",
      "Chart.js"
    ],
    link: "https://nest-ledger-smoky.vercel.app",
  },
  {
    title: "Campus Connect",
    description:
      "A college-based social networking platform where students can connect using their institutional email, share posts, images, and links, and collaborate within a secure campus community.",
    tags: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    link: "#",
  },
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Episode tag */}
        <div
          className={`mb-10 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-sky/60" aria-hidden="true" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-sky">
            Episode 03
          </span>
        </div>

        {/* Title */}
        <h2
          id="projects-heading"
          className={`mb-12 text-3xl font-light tracking-wide text-foreground transition-all delay-200 duration-1000 md:text-4xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          My Works
        </h2>

        {/* Project grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`group rounded-2xl border border-border/50 bg-card/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-1000 hover:border-sage/30 hover:shadow-md ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${300 + i * 150}ms` : "0ms" }}
            >
              <h3 className="mb-3 text-xl font-light tracking-wide text-foreground transition-colors group-hover:text-sage">
                {project.title}
              </h3>
              <p className="mb-5 font-[var(--font-inter)] text-sm font-light leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted/50 px-3 py-1 font-[var(--font-inter)] text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[var(--font-inter)] text-xs tracking-wider uppercase text-sage/70 transition-colors hover:text-sage"
                aria-label={`View project: ${project.title}`}
              >
                View Project
                <ExternalLink className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
