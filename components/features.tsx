'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '@/lib/projects'
import { getDictionary, getLocalizedPath, type Locale } from '@/lib/i18n'
import { SectionHeading } from './ui/section-heading'

type FeaturesProps = {
  locale?: Locale
}

export function Features({ locale = 'en' }: FeaturesProps) {
  const dict = getDictionary(locale).home
  const productDict = getDictionary(locale).product

  return (
    <section id="features" className="scroll-mt-20 bg-surface-tint">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          layout="split"
          title={dict.featuresTitle}
          description={dict.featuresDescription}
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col bg-surface p-6 transition-colors duration-200 hover:bg-background sm:p-8"
            >
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={48}
                height={48}
                className="mb-5 h-12 w-12 rounded-md object-contain"
              />

              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>

              <p className="mt-2 mb-6 flex-grow text-sm leading-relaxed text-muted-foreground text-pretty">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-strong"
                >
                  <ExternalLink className="h-4 w-4" />
                  {productDict.visitProduct}
                </a>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <FaGithub className="h-4 w-4" />
                    {productDict.github}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={getLocalizedPath('/product', locale)}
            className="group inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors duration-200 hover:text-accent"
          >
            {dict.featuresButton}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
