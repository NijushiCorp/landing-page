import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { defaultLocale, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type CookiePageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: CookiePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const title = locale === 'id' ? 'Kebijakan Cookie' : 'Cookie Policy'

  return getLocalizedMetadata(locale, title, title, '/cookie-policy')
}

export default async function CookiePage({ params }: CookiePageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale

  return (
    <>
      <Header locale={locale} />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-sm text-muted-foreground mb-2">Last updated: June 14, 2025</p>
        <h1 className="text-3xl font-bold text-foreground mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-10">This Cookie Policy explains how Nijushi Corp. uses cookies and similar technologies across our website and all digital products and services we operate. By using our Services, you consent to the use of cookies as described here.</p>

        <Section title="1. What Are Cookies">
          <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you navigate, and deliver a more relevant experience. Similar technologies include local storage, session storage, and pixel tags, all of which this policy also covers.</p>
        </Section>

        <Section title="2. Types of Cookies We Use">
          <div className="space-y-5 mt-3">
            <CookieType name="Essential Cookies" description="Required for our Services to function. These enable core features like page navigation, secure login, and form submissions. You cannot opt out of these without affecting Service functionality." />
            <CookieType name="Performance & Analytics Cookies" description="Help us understand how visitors interact with our platform — which pages are visited most, where users drop off, and how they navigate. Data is aggregated and anonymized. We use tools such as Google Analytics for this purpose." />
            <CookieType name="Functional Cookies" description="Remember your preferences such as language, region, or display settings so you don't have to re-enter them on every visit." />
            <CookieType name="Marketing & Tracking Cookies" description="Used to deliver relevant content and measure the effectiveness of campaigns. These may track you across sites. We only use these where you have given explicit consent." />
          </div>
        </Section>

        <Section title="3. Third-Party Cookies">
          <p>Some cookies are set by third-party services that appear on our pages, such as analytics providers, embedded maps, or social media integrations. We do not control these cookies. Please refer to the respective third-party privacy policies for more information.</p>
        </Section>

        <Section title="4. Cookies Across Our Products">
          <p>This policy applies to nijushicorp.biz.id and all sub-products, platforms, and derivative digital services operated by Nijushi Corp., whether under the same domain or separate branded domains. Each product may use different combinations of the cookie categories above, always in accordance with this policy.</p>
        </Section>

        <Section title="5. Managing Your Cookie Preferences">
          <p>You have several options to control cookies:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li><strong>Browser settings</strong> — Most browsers allow you to block or delete cookies via their privacy or security settings.</li>
            <li><strong>Opt-out tools</strong> — For analytics cookies, you can use browser extensions like Google Analytics Opt-out Add-on.</li>
            <li><strong>Cookie banner</strong> — On your first visit, you can choose which non-essential cookies to accept via our consent banner.</li>
          </ul>
          <p className="mt-3">Note that disabling certain cookies may limit the functionality of our Services.</p>
        </Section>

        <Section title="6. Cookie Retention">
          <p>Session cookies expire when you close your browser. Persistent cookies remain on your device for the duration defined in their properties, typically between 30 days and 2 years, depending on their purpose.</p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>We may update this Cookie Policy as our Services evolve or as regulations change. We will notify you of material changes through our platform. Continued use of our Services after an update means you accept the revised policy.</p>
        </Section>

        <Section title="8. Contact">
          <p>Questions about how we use cookies? Contact us at <a href="mailto:privacy@nijushicorp.biz.id" className="text-accent hover:underline">privacy@nijushicorp.biz.id</a> or through our <a href="/social" className="text-accent hover:underline">contact page</a>.</p>
        </Section>
      </main>
      <Footer locale={locale} />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

function CookieType({ name, description }: { name: string; description: string }) {
  return (
    <div className="border border-border rounded-lg p-4">
      <p className="font-medium text-foreground mb-1">{name}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}
