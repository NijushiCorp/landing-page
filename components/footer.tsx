"use client"
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, getLocaleFromPathname, getLocalizedPath, type Locale } from '@/lib/i18n'
import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { usePathname, useRouter } from 'next/dist/client/components/navigation'

import ReactCountryFlag from "react-country-flag"

type FooterProps = {
  locale?: Locale
}

export function Footer({ locale = 'en' }: FooterProps) {
  
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const dict = getDictionary(locale).footer

  
    const toggleTheme = () => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark'
      setTheme(nextTheme)
  
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
        document.documentElement.setAttribute('data-theme', nextTheme)
        document.documentElement.style.colorScheme = nextTheme
        localStorage.setItem('theme', nextTheme)
      }
    }
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
          ? savedTheme
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        setTheme(initialTheme)
        document.documentElement.classList.toggle('dark', initialTheme === 'dark')
        document.documentElement.setAttribute('data-theme', initialTheme)
        document.documentElement.style.colorScheme = initialTheme
      }
    }, [])

      const pathname = usePathname()
        const router = useRouter()
  const resolvedLocale = locale ?? getLocaleFromPathname(pathname)
  
 const switchLanguage = () => {
    const nextLocale = resolvedLocale === 'id' ? 'en' : 'id'

    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', nextLocale)
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    }

    router.push(getLocalizedPath(pathname, nextLocale))
  }

  return (
    <footer className="bg-surface-navy text-surface-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="space-y-4 md:col-span-1">
            <Image src="/logo-dark.png" width={20} height={20} alt="Nijushi Corp. logo" className="h-auto w-10" />
            <p className="text-sm text-surface-navy-foreground/70 text-pretty">{dict.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-surface-navy-foreground">{dict.company}</h3>
            <ul className="space-y-2.5 text-sm text-surface-navy-foreground/70">
              <li>
                <Link href={getLocalizedPath('/', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.home}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/about', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.about}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/product', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.product}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/social', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.social}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-surface-navy-foreground">{dict.legal}</h3>
            <ul className="space-y-2.5 text-sm text-surface-navy-foreground/70">
              <li>
                <Link href={getLocalizedPath('/privacy', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.privacy}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/terms', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.terms}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/cookie-policy', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.cookiePolicy}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/service-fee', locale)} className="transition-colors duration-200 hover:text-accent">
                  {dict.servicesFee}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-surface-navy-foreground">
              {resolvedLocale === 'id' ? 'Preferensi' : 'Preferences'}
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-surface-navy-foreground/25 px-3 text-sm font-medium text-surface-navy-foreground/80 transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navy"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{theme === 'dark' ? (resolvedLocale === 'id' ? 'Terang' : 'Light') : (resolvedLocale === 'id' ? 'Gelap' : 'Dark')}</span>
              </button>

              <button
                type="button"
                onClick={switchLanguage}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-surface-navy-foreground/25 px-3 text-sm font-medium text-surface-navy-foreground/80 transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navy"
              >
                {resolvedLocale === 'id' ? (
                  <>
                    <ReactCountryFlag countryCode="US" svg />
                    <span>EN</span>
                  </>
                ) : (
                  <>
                    <ReactCountryFlag countryCode="ID" svg />
                    <span>ID</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-surface-navy-foreground/15 pt-6 text-xs text-surface-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="https://nijushicorp.biz.id" className="transition-colors duration-200 hover:text-accent">
              {dict.mainWebsite}
            </Link>
            <span aria-hidden>•</span>
            <Link href="https://nijushicorp.biz.id/about" className="transition-colors duration-200 hover:text-accent">
              {dict.aboutCompany}
            </Link>
            <span aria-hidden>•</span>
            <a
              href="https://status.nijushicorp.biz.id"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              {resolvedLocale === 'id' ? 'Status Layanan' : 'Status Monitoring'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
