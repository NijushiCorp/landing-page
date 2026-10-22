import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { defaultLocale, getLocalizedMetadata, isValidLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

type ServiceFeePageProps = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: ServiceFeePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale
  const title = locale === 'id' ? 'Kebijakan Biaya Layanan' : 'Service Fee Policy'

  return getLocalizedMetadata(locale, title, title, '/service-fee')
}

export default async function ServiceFeePage({ params }: ServiceFeePageProps) {
  const resolvedParams = await params
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale

  return (
    <>
      <Header locale={locale} />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <p className="text-sm text-muted-foreground mb-2">Last updated: July 4, 2026</p>
        <h1 className="text-3xl font-bold text-foreground mb-6">Service Fee Policy</h1>
        <p className="text-muted-foreground mb-10">
          This Service Fee Policy sets out how service fees work across the services and products operated by Nijushi Corp., including any sub-products or derivative services (collectively, &quot;Services&quot;). It is issued as a standalone document, separate from the Terms of Service, but it is referenced by and forms a binding part of the Terms of Service.
        </p>

        <Section title="1. What the Service Fee Covers">
          <p>The service fee is charged for access to and use of the platform, infrastructure, and systems behind our Services. This covers things like transaction processing, data security, system maintenance, and the general operational support needed to keep a Service running.</p>
        </Section>

        <Section title="2. Fees May Differ Between Services">
          <p>Nijushi Corp. may run more than one Service or digital product, either under the Nijushi Corp. name or under a separate derivative brand. Because each Service has its own business model and operational cost structure, the service fee is not a single fixed number across all of them — it is set individually for each Service.</p>
          <p className="mt-3">The exact fee for a given Service is published on that Service&apos;s own website, not on this page. Before transacting, please check the official pricing page of the specific Service you are using.</p>
        </Section>

        <Section title="3. Payment Gateway Fees Included in the Service Fee">
          <p>Where a Service processes payments online, the service fee already includes the payment gateway fee charged by our third-party payment processing partner for handling the transaction. Depending on the payment method, this component is either a fixed amount per transaction or a percentage of the transaction value.</p>
          <p className="mt-3">
            For example, transactions routed through our payment gateway partner, TokoPay, currently follow this fixed fee structure:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li><span className="text-foreground font-medium">Virtual Account:</span> a fixed fee of Rp2,000&nbsp;–&nbsp;Rp4,200 per transaction, depending on the issuing bank.</li>
            <li><span className="text-foreground font-medium">QRIS:</span> Rp100 + 0.7% per transaction, or a flat 1.7% per transaction for real-time settlement.</li>
            <li><span className="text-foreground font-medium">E-Wallet</span> (DANA, OVO, ShopeePay, LinkAja, and similar): 2%&nbsp;–&nbsp;3% per transaction, depending on the provider.</li>
            <li><span className="text-foreground font-medium">Convenience Store / retail</span> (Alfamart, Indomaret, and similar): a fixed fee of Rp3,000 per transaction.</li>
            <li><span className="text-foreground font-medium">Mobile credit (Pulsa):</span> 22%&nbsp;–&nbsp;32% per transaction, depending on the carrier.</li>
          </ul>
          <p className="mt-3">
            These figures reflect TokoPay&apos;s standard published rates and may be lower on request for higher transaction volumes. The current and complete fee schedule is always available at <a href="https://tokopay.id/harga">https://tokopay.id/harga</a>.
          </p>
          <p className="mt-3">If a Service uses a different payment gateway partner, the applicable fees will instead be listed on that Service&apos;s own fee page.</p>
        </Section>

        <Section title="4. Fees Can Change">
          <p>Service fees, including the payment gateway fee component described above, may be revised from time to time by Nijushi Corp. or by our payment gateway partner. Any revision will be reflected on the official fee page of the relevant Service.</p>
        </Section>

        <Section title="5. Fees Are Non-Refundable">
          <p>Unless a project agreement or contract says otherwise in writing, service fees already paid are final and non-refundable, including any portion already passed through to the payment gateway partner.</p>
        </Section>

        <Section title="6. How This Relates to the Terms of Service">
          <p>This Policy stands on its own, but it is incorporated into and forms part of our Terms of Service by reference. Using our Services means you have read, understood, and accepted this Service Fee Policy together with the specific fees that apply to the Service you are using.</p>
        </Section>

        <Section title="7. Contact">
          <p>Questions about this Policy can be sent to <a href="mailto:legal@nijushicorp.biz.id">legal@nijushicorp.biz.id</a> or through our <a href="/social">contact page</a>.</p>
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