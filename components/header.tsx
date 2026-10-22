'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Moon, Sun, X } from 'lucide-react'
import ReactCountryFlag from "react-country-flag"
import {
  getLocaleFromPathname,
  getLocalizedPath,
  getLocaleLabel,
  type Locale,
} from '@/lib/i18n'
import { RxGlobe2 } from "react-icons/rx";

const MOBILE_MENU_ANIM_MS = 300

type HeaderProps = {
  locale?: Locale
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const resolvedLocale = locale ?? getLocaleFromPathname(pathname)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [scrolled, setScrolled] = useState(false)
  // Set initial scroll state synchronously before first paint so no
  // transition runs on mount.  No skipTransition needed — the class
  // only changes when the user actually scrolls past the threshold.
  useLayoutEffect(() => {
    setScrolled(window.scrollY > 24)
  }, [pathname])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks =
    resolvedLocale === 'id'
      ? [
          { name: 'Beranda', href: '/' },
          { name: 'Produk', href: '/product' },
          { name: 'Tentang Perusahaan', href: '/about' },
        ]
      : [
          { name: 'Home', href: '/' },
          { name: 'Product', href: '/product' },
          { name: 'About Company', href: '/about' },
        ]

  const openMenu = () => {
    setIsClosing(false)
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, MOBILE_MENU_ANIM_MS)
  }

  const switchLanguage = () => {
    const nextLocale = resolvedLocale === 'id' ? 'en' : 'id'

    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', nextLocale)
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    }

    router.push(getLocalizedPath(pathname, nextLocale))
    closeMenu()
  }

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

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
  <>
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-border bg-surface/95 backdrop-blur-sm'
          : 'border-transparent bg-background'
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 transition-[padding] duration-200 ease-out sm:px-6 lg:px-8 ${
          scrolled ? 'py-5' : 'py-4'
        }`}
      >
          <Link href={getLocalizedPath('/', resolvedLocale)} className="justify-self-start min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Image
                src="/logo.png"
                alt="Nijushi Corp. Logo"
                width={48}
                height={48}
                className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
              />
              <span className="text-xs sm:text-md md:text-xl font-bold text-foreground whitespace-nowrap truncate">Nijushi Corp.</span>
            </div>
          </Link>

          <nav className="hidden items-center justify-self-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getLocalizedPath(link.href, resolvedLocale)}
                className="group relative inline-block whitespace-nowrap py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.name}
                <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-3 lg:flex">

            <button
              type="button"
              onClick={switchLanguage}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {resolvedLocale === 'en' ? (
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


            <Link
              href={getLocalizedPath('/social', resolvedLocale)}
              className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap"
            >
              {resolvedLocale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </Link>
            
            
          </div>

          <div className="flex items-center gap-2 lg:hidden justify-self-end col-start-3 min-w-0 shrink-0">
            <button
              type="button"
              onClick={switchLanguage}
              className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:px-3 sm:text-sm"
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

            <button
              onClick={openMenu}
              className="-mr-2 shrink-0 cursor-pointer p-2 text-foreground transition-colors duration-200 hover:text-accent"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm duration-300 ${
              isClosing ? 'animate-out fade-out' : 'animate-in fade-in'
            }`}
            onClick={closeMenu}
          />

          <div
            className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-background border-l border-border shadow-2xl flex flex-col duration-300 fill-mode-forwards overflow-hidden ${
              isClosing
                ? 'animate-out slide-out-to-right ease-in'
                : 'animate-in slide-in-from-right ease-out'
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Nijushi Corp. Logo"
                  width={48}
                  height={48}
                  className="w-7 h-7"
                />
                <span className="text-base font-bold text-foreground">Nijushi Corp.</span>
              </div>
              <button
                onClick={closeMenu}
                className="-mr-2 cursor-pointer p-2 text-foreground transition-transform duration-200 hover:text-accent"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={getLocalizedPath(link.href, resolvedLocale)}
                  onClick={closeMenu}
                  className={`border-b border-border py-4 text-base font-medium text-foreground transition-colors duration-200 hover:text-accent fill-mode-backwards ${
                    isClosing
                      ? 'animate-out fade-out slide-out-to-right-8'
                      : 'animate-in fade-in slide-in-from-right-8'
                  }`}
                  style={{
                    animationDelay: isClosing
                      ? `${(navLinks.length - index - 1) * 60}ms`
                      : `${100 + index * 80}ms`,
                    animationDuration: '300ms',
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href={getLocalizedPath('/social', resolvedLocale)}
                onClick={closeMenu}
                className={`mt-6 rounded-lg bg-accent py-2.5 text-center text-lg font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent-strong fill-mode-backwards ${
                  isClosing
                    ? 'animate-out fade-out slide-out-to-right-8'
                    : 'animate-in fade-in slide-in-from-right-8'
                }`}
                style={{
                  animationDelay: isClosing ? '0ms' : `${100 + navLinks.length * 80}ms`,
                  animationDuration: '300ms',
                }}
              >
                {resolvedLocale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Link>

            </nav>
          </div>
        </div>
      )}
    </>
  )
}