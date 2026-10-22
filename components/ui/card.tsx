import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Two tiers only. `flat` is the default because most cards sit on the page and
 * have no reason to lift. `raised` is the exception for the one card per view
 * that carries the primary decision.
 *
 * Shadow is the elevation marker, so a shadow without a reason is a bug.
 */
type CardTier = 'flat' | 'raised'

type CardProps = {
  children: ReactNode
  tier?: CardTier
  /** Adds the interactive affordance (border + hover). Use on links only. */
  interactive?: boolean
  className?: string
}

export function Card({ children, tier = 'flat', interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border p-6',
        tier === 'raised'
          ? 'border-transparent bg-surface shadow-[0_1px_2px_rgba(26,31,77,0.04),0_12px_32px_-12px_rgba(26,31,77,0.16)]'
          : 'border-border bg-surface',
        interactive && 'transition-colors duration-200 hover:border-accent',
        className,
      )}
    >
      {children}
    </div>
  )
}
