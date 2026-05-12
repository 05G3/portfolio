"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { X, Award } from "lucide-react"

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2026",
    file: "cert/AWS Certified Cloud Practitioner certificate_page-0001.jpg"
  },
  {
    title: "Data Analysis with Python",
    issuer: "Coursera",
    year: "2025",
    file: "cert/Coursera L00J4QGFY9Z2_page-0001.jpg"
  },
  {
    title: "HTML and CSS",
    issuer: "edX",
    year: "2024",
    file: "cert/HTML and CSS. Certificate_page-0001.jpg"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Netcad",
    year: "2026",
    file: "cert/Introduction_to_Data_Science_certificate_dorarakesh8-gmail-com_562af40b-300f-4fdb-bce5-7ace537f4566_page-0001.jpg"
  },
  {
    title: "Hack-a-bot",
    issuer: "UiPath",
    year: "2024",
    file: "cert/M Rakesh Dora_page-0001.jpg"
  },
  {
    title: "Privacy and Security in Online Social Media",
    issuer: "NPTEL",
    year: "2025",
    file: "cert/Privacy and Security in Online Social Media_250511_104159_page-0001.jpg"
  },
  {
    title: "Python Full Stack - Internship",
    issuer: "EduSkills",
    year: "2026",
    file: "cert/Rakesh DORA MADAKAM_Certificate_page-0001.jpg"
  },
  {
    title: "Social Networks",
    issuer: "NPTEL",
    year: "2024",
    file: "cert/Rakesh DORA MADAKAM_Certificate_page-0001.jpg"
  },
  {
    title: "Strategic Approach to Talent Management",
    issuer: "edX",
    year: "2024",
    file: "cert/Strategic approch to talent management_page-0001.jpg"
  },
  {
    title: "Automation Explorer",
    issuer: "UiPath Academy",
    year: "2024",
    file: "cert/Ui path_page-0001.jpg"
  },
  {
    title: "Linux Essentials",
    issuer: "Cisco Netcad",
    year: "2025",
    file: "cert/_certificate_dorarakesh8-gmail-com_829ef6b9-fc24-4c28-bbde-95428982cc3c_page-0001.jpg"
  },
  {
    title: "C Programming",
    issuer: "C++ Institute",
    year: "2024",
    file: "cert/c mukesh_page-0001.jpg"
  },
  {
    title: "Python Programming",
    issuer: "Python Institute",
    year: "2024",
    file: "cert/python_page-0001.jpg"
  },
]

export function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null)
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

  const closeModal = useCallback(() => setSelectedCert(null), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    if (selectedCert) {
      document.addEventListener("keydown", handleKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [selectedCert, closeModal])

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative bg-card/50 px-6 py-24 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section tag */}
        <div
          className={`mb-10 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-peach/60" aria-hidden="true" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-peach">
            Achievements
          </span>
        </div>

        {/* Title */}
        <h2
          id="certifications-heading"
          className={`mb-12 text-3xl font-light tracking-wide text-foreground transition-all delay-200 duration-1000 md:text-4xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Certifications & Achievements
        </h2>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <button
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              className={`group flex flex-col items-start gap-3 rounded-xl border border-border/50 bg-card p-6 text-left shadow-sm transition-all duration-1000 hover:border-sage/30 hover:shadow-md ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${300 + i * 100}ms` : "0ms" }}
              aria-label={`View details for ${cert.title}`}
            >
              <Award className="h-5 w-5 text-peach/70 transition-colors group-hover:text-sage" />
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                {cert.title}
              </h3>
              <p className="font-[var(--font-inter)] text-xs text-muted-foreground">
                {cert.issuer}
              </p>
              <span className="font-[var(--font-inter)] text-[11px] text-warm-gray/50">
                {cert.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate details: ${selectedCert.title}`}
        >
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] animate-in fade-in zoom-in-95 rounded-2xl border border-border/50 bg-card shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 text-muted-foreground transition-colors hover:text-foreground bg-card/80 backdrop-blur-sm rounded-full p-2"
              aria-label="Close certificate details"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex flex-col items-center gap-4 text-center p-6 border-b border-border/50">
                <Award className="h-8 w-8 text-sage" />
                <h3 className="text-xl font-light tracking-wide text-foreground">
                  {selectedCert.title}
                </h3>
                <p className="font-[var(--font-inter)] text-sm text-muted-foreground">
                  {selectedCert.issuer}
                </p>
                <span className="rounded-full bg-muted/50 px-4 py-1 font-[var(--font-inter)] text-xs text-muted-foreground">
                  {selectedCert.year}
                </span>
              </div>
              
              {/* Image Viewer */}
              <div className="flex-1 overflow-hidden bg-black/5">
                <img
                  src={selectedCert.file}
                  alt={`${selectedCert.title} Certificate`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Image failed to load:', selectedCert.file)
                    console.error('Available paths:', window.location.origin + '/' + selectedCert.file)
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', selectedCert.file)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
