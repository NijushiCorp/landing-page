import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Official social media accounts of Nijushi Corp.',
}

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
