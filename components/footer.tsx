export function Footer() {
  return (
    <footer className="border-t border-border/30 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3">
        <p className="font-[var(--font-inter)] text-xs text-muted-foreground/60">
          Crafted with quiet intention and a love for storytelling
        </p>
        <p className="font-[var(--font-inter)] text-[11px] text-muted-foreground/40">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
