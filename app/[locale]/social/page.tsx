import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SocialCard } from '@/components/social-card'
import { socials, getPrimaryUrl } from '@/lib/socials-full'
import { AlertTriangle, ShieldAlert } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { defaultLocale, getDictionary, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type SocialPageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: SocialPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).social

  return getLocalizedMetadata(locale, dict.metadataTitle, dict.description, '/social')
}

export default async function SocialPage({ params }: SocialPageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).social
  const reportContact = socials.find((s) => s.name === 'Nishia Customer Support') ?? socials[0]

  return (
<div className="min-h-screen bg-background text-foreground flex flex-col">
  <Header locale={locale} />
  <main className="flex-1 w-full">
        <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{dict.title}</h1>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">{dict.description}</p>
        </section>

        <section className="max-w-3xl mx-auto px-4">
          <div className="flex items-start gap-4 bg-accent/10 border border-accent/30 rounded-lg p-5">
            <AlertTriangle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-foreground leading-relaxed">{dict.warning}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {socials.map((social) => (
              <SocialCard key={social.name} social={social} />
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <div className="bg-card/95 border border-border/80 rounded-xl shadow-sm p-8 md:p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{dict.reportTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{dict.reportDescription}</p>
            <a href={getPrimaryUrl(reportContact)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition">
              <FaWhatsapp className="w-5 h-5" />
              {dict.reportButton}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
