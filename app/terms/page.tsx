import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { defaultLocale, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type TermsPageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const title = locale === 'id' ? 'Ketentuan Layanan' : 'Terms of Service'

  return getLocalizedMetadata(locale, title, title, '/terms')
}

export default async function TermsPage({ params }: TermsPageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale

  return (
    <>
      <Header locale={locale} />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <p className="text-sm text-muted-foreground mb-2">Last updated: July 4, 2026</p>
        <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">
          These Terms of Service govern your use of all services, platforms, and digital products provided by Nijushi Corp., including any sub-products or derivative services (collectively, &quot;Services&quot;). By accessing or using our Services, you agree to be bound by these terms.
        </p>

        <Section title="1. Acceptance of Terms">
          <p>By using any Nijushi Corp. Service — whether as a client, end user, or visitor — you confirm that you are at least 18 years old and have the legal authority to agree to these terms on behalf of yourself or your organization.</p>
        </Section>

        <Section title="2. Description of Services">
          <p>Nijushi Corp. provides digital services including but not limited to web development, mobile application development, UI/UX design, digital strategy, and technology consulting. We also develop and operate digital products and platforms, which may be offered under separate branding as derivative services of Nijushi Corp.</p>
          <p className="mt-3">These terms apply equally to all current and future Services unless a specific Service has its own supplementary terms, in which case both sets of terms apply together.</p>
        </Section>

        <Section title="3. User Responsibilities">
          <p>When using our Services, you agree to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>Provide accurate and up-to-date information when requested.</li>
            <li>Use our Services only for lawful purposes.</li>
            <li>Not attempt to gain unauthorized access to any part of our systems or infrastructure.</li>
            <li>Not use our Services to distribute harmful, misleading, or infringing content.</li>
            <li>Keep your account credentials confidential and notify us of any unauthorized use.</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>All content, designs, code, branding, and materials produced by Nijushi Corp. remain the intellectual property of Nijushi Corp. unless explicitly transferred in a signed agreement. Work delivered to clients is subject to the terms of the project contract.</p>
          <p className="mt-3">You may not reproduce, distribute, or create derivative works from our proprietary materials without written permission.</p>
        </Section>

        <Section title="5. Client Deliverables">
          <p>Ownership of deliverables produced for clients (websites, apps, designs) transfers to the client upon full payment as agreed in the project contract. Nijushi Corp. retains the right to display the work in its portfolio unless otherwise agreed in writing.</p>
        </Section>

        <Section title="6. Payment and Billing">
          <p>Payment terms are defined in individual project agreements or subscription plans. Invoices are due within the period stated. Late payments may incur fees or result in suspension of Services. All fees are non-refundable unless stated otherwise in your agreement.</p>
          <p className="mt-3">
            Our Services may also be subject to a service fee, which may include a payment gateway fee component for transactions processed online. The specific amount of the service fee varies by Service and is detailed on the official page of the relevant Service. The full terms governing these fees are set out in our{' '}
            <a href="/service-fee" className="text-accent hover:underline">
              Service Fee Policy
            </a>
            , which forms an integral part of these Terms of Service.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>Nijushi Corp. provides Services &quot;as is.&quot; We are not liable for indirect, incidental, or consequential damages arising from your use of our Services, including loss of revenue, data, or business opportunities, even if we were advised of the possibility of such damages.</p>
          <p className="mt-3">Our total liability for any claim shall not exceed the amount paid by you for the relevant Service in the three months preceding the claim.</p>
        </Section>

        <Section title="8. Termination">
          <p>Either party may terminate an engagement as specified in the project contract. We reserve the right to suspend or terminate access to our Services if these terms are violated, without prior notice in cases of serious breach.</p>
        </Section>

        <Section title="9. Governing Law">
          <p>These terms are governed by the laws of Indonesia. Any disputes shall be resolved through good-faith negotiation first, and if unresolved, through the appropriate courts in Indonesia.</p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p>We may update these terms at any time. We will notify you of significant changes via email or a notice on our platform. Continued use of our Services after the effective date means you accept the updated terms.</p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about these terms, contact us at <a href="mailto:legal@nijushicorp.biz.id" className="text-accent hover:underline">legal@nijushicorp.biz.id</a> or through our <a href="/social" className="text-accent hover:underline">contact page</a>.</p>
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