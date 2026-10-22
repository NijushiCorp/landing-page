'use client'

import { ChevronDown } from 'lucide-react'

type ScrollDownArrowProps = {
  /** CSS selector or element id of the section to scroll to. e.g. "#next-section" */
  target?: string
  /** Optional click handler if you want custom scroll logic instead of `target` */
  onClick?: () => void
  className?: string
  label?: string
}

export function ScrollDownArrow({
  target,
  onClick,
  className = '',
  label = 'Scroll down',
}: ScrollDownArrowProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    if (target) {
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`group inline-flex cursor-pointer flex-col items-center gap-2 rounded-full text-muted-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-accent">
        <ChevronDown className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" />
      </span>
    </button>
  )
}
