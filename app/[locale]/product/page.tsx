import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { projects } from '@/lib/projects'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { defaultLocale, getDictionary, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type ProductPageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).product

  return getLocalizedMetadata(locale, dict.metadataTitle, dict.description, '/product')
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const dict = getDictionary(locale).product

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{dict.title}</h1>
            <p className="text-md text-muted-foreground max-w-xl mx-auto">{dict.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-card/95 border border-border/80 rounded-xl shadow-sm p-8 hover:shadow-md transition group flex flex-col">
                <div className="mb-4">
                  <Image src={project.logo} alt={`${project.title} logo`} width={48} height={48} className="rounded-md object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{project.description}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    {dict.visitProduct}
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline">
                      <FaGithub className="w-4 h-4" />
                      {dict.github}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />
        <CTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}