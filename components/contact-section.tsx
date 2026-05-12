"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Send } from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialize EmailJS once when component mounts
    const initializeEmailJS = () => {
      if ((window as any).emailjs) {
        (window as any).emailjs.init("YOUR_PUBLIC_KEY") // Replace with your EmailJS public key
        console.log("EmailJS initialized successfully")
      } else {
        console.error("EmailJS not loaded")
        setSubmitStatus("error")
      }
    }

    // Wait for EmailJS to be available
    const checkEmailJS = setInterval(() => {
      if ((window as any).emailjs) {
        clearInterval(checkEmailJS)
        initializeEmailJS()
      }
    }, 100)

    return () => clearInterval(checkEmailJS)
  }, [])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Use a simple email service that works reliably
      const response = await fetch("https://formsubmit.co/ajax/submit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Portfolio Contact Form - " + formData.name,
          _template: "table",
          _captcha: "false",
        })
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
        console.error("Form submission failed:", response)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-2xl">
        {/* Episode tag */}
        <div
          className={`mb-10 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-sage/60" aria-hidden="true" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-sage">
            Final Episode
          </span>
        </div>

        {/* Title */}
        <h2
          id="contact-heading"
          className={`mb-4 text-3xl font-light tracking-wide text-foreground transition-all delay-200 duration-1000 md:text-4xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {"Let's Connect"}
        </h2>

        <p
          className={`mb-12 font-[var(--font-inter)] text-sm font-light leading-relaxed text-muted-foreground transition-all delay-300 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Every story is better when shared. If you would like to collaborate,
          chat, or simply say hello, I would love to hear from you.
        </p>

        {/* Contact form */}
        <form
          action="https://formsubmit.co/6ed90f4d561698d2bdf3a4952c8887b8"
          method="POST"
          target="_blank"
          className={`mb-12 flex flex-col gap-5 transition-all delay-400 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="name"
                className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-border/50 bg-card px-4 py-3 font-[var(--font-inter)] text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:border-sage/40 focus:outline-none focus:ring-1 focus:ring-sage/20"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="email"
                className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-border/50 bg-card px-4 py-3 font-[var(--font-inter)] text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:border-sage/40 focus:outline-none focus:ring-1 focus:ring-sage/20"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="resize-none rounded-lg border border-border/50 bg-card px-4 py-3 font-[var(--font-inter)] text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:border-sage/40 focus:outline-none focus:ring-1 focus:ring-sage/20"
              placeholder="Write your message..."
            />
          </div>
          
          {/* Status messages */}
          {submitStatus === "success" && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
              <p className="text-sm text-green-600">Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}
          
          {submitStatus === "error" && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-sm text-red-600">Failed to send message. Please try again later.</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-sage px-6 py-3 font-[var(--font-inter)] text-xs tracking-wider uppercase text-primary-foreground transition-all hover:bg-sage/90 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Social links */}
        <div
          className={`flex items-center gap-6 transition-all delay-600 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href="https://github.com/05G3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-sage"
            aria-label="Visit GitHub profile"
          >
            <Github className="h-5 w-5" />
            <span className="font-[var(--font-inter)] text-xs">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rakesh-dora-9250a22a5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-sage"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-[var(--font-inter)] text-xs">LinkedIn</span>
          </a>
        </div>

        {/* Closing quote */}
        <div
          className={`mt-16 flex flex-col items-center gap-4 transition-all delay-800 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="h-px w-20 bg-sage/30" aria-hidden="true" />
          <p className="max-w-sm text-center text-lg font-light italic leading-relaxed tracking-wide text-sage/60">
            {'"And so, the story continues... with every line of code written, a new chapter begins."'}
          </p>
          <div className="h-px w-20 bg-sage/30" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
