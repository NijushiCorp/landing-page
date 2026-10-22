import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Three arrangements, so consecutive sections don't all read as
 * "centred title + centred subtext + grid".
 *
 *  center — the default, used sparingly
 *  left   — title and subtext stacked left, for sections that flow into a list
 *  split  — title left, subtext right; the page-level heading treatment
 */
type HeadingLayout = 'center' | 'left' | 'split'

type SectionHeadingProps = {
  title: ReactNode
  description?: ReactNode
  layout?: HeadingLayout
  className?: string
}

const titleStyles = 'text-3xl font-bold tracking-tight text-balance sm:text-4xl'

export function SectionHeading({
  title,
  description,
  layout = 'center',
  className,
}: SectionHeadingProps) {
  const descriptionStyles = 'text-muted-foreground text-pretty'

  if (layout === 'split') {
    return (
      <div
        className={cn(
          'grid gap-4 border-b border-border pb-8 md:grid-cols-2 md:items-end md:gap-10',
          className,
        )}
      >
        <h2 className={cn(titleStyles, 'max-w-xl')}>{title}</h2>
        {description ? (
          <p className={cn(descriptionStyles, 'md:pb-1')}>{description}</p>
        ) : null}
      </div>
    )
  }

  if (layout === 'left') {
    return (
      <div className={cn('max-w-2xl space-y-3', className)}>
        <h2 className={titleStyles}>{title}</h2>
        {description ? <p className={descriptionStyles}>{description}</p> : null}
      </div>
    )
  }

  return (
    <div className={cn('mx-auto max-w-2xl space-y-3 text-center', className)}>
      <h2 className={titleStyles}>{title}</h2>
      {description ? <p className={cn(descriptionStyles, 'mx-auto max-w-xl')}>{description}</p> : null}
    </div>
  )
}
