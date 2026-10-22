import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Section keeps one concern in one place: which band of the page this is, and
 * how much vertical room it gets. The tone carries the separation, so sections
 * never need a `<div className="border-t" />` shoved between them.
 *
 * tone:  cream = page ground, tint = deeper cream band, white = raised band,
 *        navy  = inverted brand band (footer / closing statement)
 * size:  base rhythm, or `lg` for the one or two sections that should dominate
 */
type SectionTone = 'cream' | 'tint' | 'white' | 'navy'
type SectionSize = 'base' | 'lg' | 'sm'

const toneStyles: Record<SectionTone, string> = {
  cream: 'bg-background text-foreground',
  tint: 'bg-surface-tint text-foreground',
  white: 'bg-surface text-foreground',
  navy: 'bg-surface-navy text-surface-navy-foreground',
}

const sizeStyles: Record<SectionSize, string> = {
  sm: 'py-12 sm:py-14',
  base: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
}

type SectionProps = {
  children: ReactNode
  tone?: SectionTone
  size?: SectionSize
  /** Set false when the section renders its own full-bleed layout. */
  container?: boolean
  className?: string
  containerClassName?: string
  id?: string
}

export function Section({
  children,
  tone = 'cream',
  size = 'base',
  container = true,
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneStyles[tone], sizeStyles[size], className)}>
      {container ? (
        <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', containerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}
