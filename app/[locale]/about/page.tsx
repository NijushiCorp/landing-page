import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { SocialLinks } from '@/components/social'
import { Lightbulb, ShieldCheck, Users, Rocket } from 'lucide-react'
import { defaultLocale, getDictionary, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { ScrollDownArrow } from '@/components/ui/scroll'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type AboutPageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).about

  return getLocalizedMetadata(locale, dict.metadataTitle, dict.heroDescription, '/about')
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).about
  const missionIcons = [Lightbulb, ShieldCheck, Users, Rocket]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center space-y-4">
            <div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            {locale === 'id' ? 'Bukan Hanya Tentang Kami,' : 'Not Just About Us,'}
            </h1>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            {locale === 'id' ? 'Tapi Tentang ' : 'It\'s About '}
            <span className="relative inline-block px-2 py-1">
            <span className="absolute inset-0 -rotate-1 rounded-sm bg-accent/25" />
            <span className="relative text-foreground">{locale === 'id' ? 'Anda' : 'You'}</span>
          </span>
          </h1>
          </div>
          <p className="text-md md:text-lg text-muted-foreground text-balance">
            {dict.heroDescription}
          </p>
        <ScrollDownArrow target="#vision" className="mt-8"/>
        </section>

        <div className="border-t border-border" />

        <section id="vision" className="scroll-smooth scroll-mt-20 max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{dict.visionTitle}</h2>
          <p className="text-4xl md:text-5xl font-semibold text-foreground text-balance">
            {dict.visionLead}
          </p>
          <p className="text-sm md:text-base text-muted-foreground">{dict.visionSupport}</p>
        </section>



        <section className="max-w-7xl mx-auto px-4 pb-15">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{dict.missionTitle}</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto">{dict.missionDescription}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {dict.missions.map((mission, index) => {
              const Icon = missionIcons[index]
              return (
                <div key={mission.title} className="bg-card/95 border border-border/80 rounded-xl shadow-sm p-8 hover:shadow-md transition flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{mission.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <div className="border-t border-border" />

        <SocialLinks locale={locale} />
        <CTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
