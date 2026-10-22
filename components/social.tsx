import { socials } from '@/lib/socials'
import { getDictionary, type Locale } from '@/lib/i18n'
import { SectionHeading } from './ui/section-heading'

type SocialLinksProps = {
  locale?: Locale
}

export function SocialLinks({ locale = 'en' }: SocialLinksProps) {
  const dict = getDictionary(locale).home

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          layout="center"
          title={dict.socialTitle}
          description={dict.socialDescription}
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-3 text-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <social.icon className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
