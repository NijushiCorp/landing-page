import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

export type SocialIconName = 'whatsapp' | 'github' | 'x' | 'instagram' | 'linkedin'

export interface SocialAccount {
  /** Label shown when a platform has more than one account (e.g. department/division name) */
  label: string
  url: string
}

export interface SocialEntry {
  name: string
  icon: SocialIconName
  /**
   * A platform can have more than one account (e.g. multiple WhatsApp numbers for
   * different departments). If there's only one account, it's rendered as a direct
   * link. If there's more than one, it's rendered as a dropdown listing each account.
   */
  accounts: SocialAccount[]
}

const socialIconMap: Record<SocialIconName, IconType> = {
  whatsapp: FaWhatsapp,
  github: FaGithub,
  x: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
}

export function getSocialIcon(iconName: SocialIconName): IconType {
  return socialIconMap[iconName]
}

export const socials: SocialEntry[] = [
  {
    name: 'Nishia Customer Support',
    icon: 'whatsapp',
    accounts: [
      { label: 'Customer Support', url: 'https://wa.me/6285163614050' },
      // Tambahkan akun WhatsApp lain di sini, contoh:
      // { label: 'Sales', url: 'https://wa.me/62xxxxxxxxxx' },
    ],
  },
  {
    name: 'GitHub',
    icon: 'github',
    accounts: [{ label: 'GitHub', url: 'https://github.com/nijushicorp' }],
  },
  {
    name: 'X',
    icon: 'x',
    accounts: [{ label: 'X (Twitter)', url: 'https://x.com/nijushicorp' }],
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    accounts: [
      { label: 'Nijushi Corp.', url: 'https://instagram.com/nijushicorp' },
      { label: 'RukoGamer', url: 'https://instagram.com/officialrukogamer' },
    ],
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    accounts: [
      { label: 'Nijushi Corp.', url: 'https://www.linkedin.com/company/nijushicorp/' },
      { label: 'RukoGamer', url: 'https://www.linkedin.com/company/rukogamer/' },
    ],
  },
]

/** Primary/default URL for a social entry — used where only a single link makes sense (e.g. header, homepage pills) */
export function getPrimaryUrl(social: SocialEntry): string {
  return social.accounts[0]?.url ?? '#'
}
