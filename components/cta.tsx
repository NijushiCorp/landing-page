import { getDictionary, type Locale } from '@/lib/i18n'

type CTAProps = {
  locale?: Locale
}

export function CTA({ locale = 'en' }: CTAProps) {
  const dict = getDictionary(locale).home

  return (
    <section id="contact" className="bg-surface-tint">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-card bg-background px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {dict.ctaTitle}
            </h2>
            <p className="text-base text-pretty sm:text-lg">
              {dict.ctaDescription}
            </p>
            <div className="pt-2">
              <a
                href="mailto:hello@nijushicorp.biz.id"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-base font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navy"
              >
                {dict.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
