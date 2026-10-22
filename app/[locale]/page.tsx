import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { SocialLinks } from '@/components/social'
import { defaultLocale, getDictionary, getLocalizedMetadata, isValidLocale, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type HomePageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).home

  return getLocalizedMetadata(locale, dict.metadataTitle, dict.heroDescription, '/')
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <Hero locale={locale} />
        <Features locale={locale} />
        <SocialLinks locale={locale} />
        <CTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
