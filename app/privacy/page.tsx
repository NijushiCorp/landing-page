import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy — Nijushi Corp.',
  description: 'How Nijushi Corp. collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      <p className="text-sm text-muted-foreground mb-2">Last updated: June 20, 2025</p>
      <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10">
        This Privacy Policy applies to Nijushi Corp. and all products, services, platforms, and
        digital solutions developed or operated by Nijushi Corp. (collectively, "Services"). By
        using our Services, you agree to the practices described below.
      </p>

      <Section title="1. Who We Are">
        <p>
          Nijushi Corp. is a digital services company providing web development, mobile
          applications, UI/UX design, digital consulting, and related technology services. This
          policy covers our main platform and any sub-products or derivative services we operate
          under the Nijushi Corp. brand.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>We collect information in two ways:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>
            <strong>Information you provide</strong> — name, email address, phone number, company
            name, and any other details you submit through forms, onboarding flows, or direct
            communication with us.
          </li>
          <li>
            <strong>Information collected automatically</strong> — device type, browser, IP address,
            pages visited, time spent, referral source, and interaction events. This is collected
            via cookies and similar technologies (see our Cookie Policy).
          </li>
          <li>
            <strong>Information from third parties</strong> — if you connect a third-party account
            or if a client shares data with us to deliver a service, we may receive additional
            information in accordance with the permissions granted.
          </li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use your data to:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Deliver and improve our Services and any derivative products.</li>
          <li>Respond to inquiries, support requests, and project communications.</li>
          <li>Send relevant updates, proposals, or newsletters (you can opt out at any time).</li>
          <li>Analyze usage patterns to enhance user experience across our platforms.</li>
          <li>Meet legal obligations and enforce our Terms of Service.</li>
        </ul>
      </Section>

      <Section title="4. Data Sharing">
        <p>
          We do not sell your personal data. We may share information with trusted third-party
          vendors (hosting, analytics, payment processors) solely to operate our Services. These
          parties are contractually required to protect your data and may not use it for their own
          purposes.
        </p>
        <p className="mt-3">
          We may disclose data if required by law, court order, or to protect the rights and safety
          of our users or the public.
        </p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain personal data for as long as necessary to provide our Services and comply with
          legal obligations. When data is no longer needed, we delete or anonymize it securely.
        </p>
      </Section>

      <Section title="6. Your Rights">
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data ("right to be forgotten").</li>
          <li>Object to or restrict certain types of processing.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@nijushicorp.biz.id" className="text-accent hover:underline">
            privacy@nijushicorp.biz.id
          </a>
          .
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We apply industry-standard security measures including encryption in transit and at rest,
          access controls, and regular audits. No system is 100% secure; if you believe your data
          has been compromised, contact us immediately.
        </p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>
          Our Services are not directed at children under 13. We do not knowingly collect data from
          minors. If you believe a child has submitted personal data to us, please contact us and we
          will delete it promptly.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this policy periodically. We will notify you of material changes via email
          or a prominent notice on our platform. Continued use of our Services after the effective
          date constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about this policy? Reach us at{' '}
          <a href="mailto:privacy@nijushicorp.biz.id" className="text-accent hover:underline">
            privacy@nijushicorp.biz.id
          </a>{' '}
          or through our{' '}
          <a href="/social" className="text-accent hover:underline">
            contact page
          </a>
          .
        </p>
      </Section>
    </main>
      <Footer />
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
