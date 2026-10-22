import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LocaleBootstrap } from '@/components/locale-bootstrap'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const themeScript = `
(function(){
  try {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    console.error(error);
  }
})();
`

export const metadata: Metadata = {
  metadataBase: new URL('https://nijushicorp.biz.id'),
  title: {
    default: "Nijushi Corp.",
    template: "%s | Nijushi Corp.",
  },
  description: 'Nijushi Corp. provides a wide range of digital services and goods to help everyone. Find #YourDecision with Nijushi Corp.!',
  
  openGraph: {
  images: [
    {
      url: 'https://nijushicorp.biz.id/opengraph-image.png', // Must be an absolute URL
    },
  ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F3EA' },
    { media: '(prefers-color-scheme: dark)', color: '#F7F3EA' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LocaleBootstrap />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
