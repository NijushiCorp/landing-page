import type { Metadata } from 'next'

export const locales = ['id', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isValidLocale(value: string | undefined | null): value is Locale {
  return value !== undefined && value !== null && locales.includes(value as Locale)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return isValidLocale(firstSegment) ? firstSegment : defaultLocale
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname.split('?')[0]
  const segments = cleanPath.split('/').filter(Boolean)
  const hasLocaleSegment = isValidLocale(segments[0])

  if (hasLocaleSegment) {
    segments[0] = locale
    return `/${segments.join('/')}` || `/${locale}`
  }

  if (cleanPath === '/' || cleanPath === '') {
    return `/${locale}`
  }

  return `/${[locale, ...segments].join('/')}`
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

export function getLocaleLabel(locale: Locale) {
  return locale === 'id' ? 'Bahasa Indonesia' : 'English'
}

export function getLocalizedMetadata(
  locale: Locale,
  metadataTitle: string,
  description: string,
  path = '/',
): Metadata {
  const normalizedPath = path === '/' || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`
  const canonicalPath = `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en${normalizedPath === '/' ? '' : normalizedPath}`,
        id: `/id${normalizedPath === '/' ? '' : normalizedPath}`,
      },
    },
    openGraph: {
      title: metadataTitle,
      description,
      url: `https://nijushidigital.biz.id${canonicalPath}`,
    },
  }
}

const dictionaries = {
  id: {
    nav: {
      home: 'Beranda',
      product: 'Produk',
      about: 'Tentang Perusahaan',
      contact: 'Hubungi Kami',
      switchLanguage: 'Ganti Bahasa',
    },
    home: {
      metadataTitle: 'Beranda',
      heroDescription:
        'Wujudkan masa depan digital Anda dengan solusi cerdas yang dirancang untuk mereka yang menghargai kendali dan otonomi.',
      heroButton: 'Pelajari Lebih Lanjut',
      scrollLanjut: 'Scroll Untuk Melanjutkan Membaca',
      featuresTitle: 'Produk Kami',
      featuresDescription:
        'Nijushi Digital berkomitmen untuk terus menghadirkan produk dan layanan yang dapat membantu banyak pihak, dan berikut beberapa yang telah kami kerjakan:',
      featuresButton: 'Lihat Semua Produk',
      socialTitle: 'Mari Terhubung',
      socialDescription:
        'Ikuti kami di media sosial untuk pembaruan, berita, dan konten di balik layar.',
      ctaTitle: 'Tertarik untuk Bekerja Sama?',
      ctaDescription: 'Anda dapat menghubungi kami sesegera mungkin! #YourDecision menanti.',
      ctaButton: 'Mulai Perjalanan',
    },
    about: {
      metadataTitle: 'Tentang',
      heroTitle: '',
      heroDescription:
        'Nijushi Digital adalah studio digital yang membangun website, alat, dan layanan lainnya untuk individu maupun bisnis yang membutuhkan solusi digital yang andal. Semua nya dalam kendali Anda, bukan kami!',
      visionTitle: 'Visi Kami',
      visionLead: '"Menjadi partner bisnis terbaik anda"',
      visionSupport:
        'Kami percaya bisnis yang sehat seharus menguntungkan kedua belah pihak, bukan hanya satu pihak.',
      missionTitle: 'Misi Kami',
      missionDescription: 'Prinsip yang menjadi panduan dalam setiap hal yang kami bangun di Nijushi Digital.',
      missions: [
        {
          title: 'Membangun Produk Andal',
          description:
            'Memberikan produk dan layanan digital yang cepat, terjangkau, dan benar-benar bermanfaat untuk kebutuhan setiap pihak.',
        },
        {
          title: 'Selalu Transparan',
          description:
            'Mendesain solusi yang mengembalikan kendali kepada Anda — transparan, aman, dan bebas dari keterikatan yang tidak perlu.',
        },
        {
          title: 'Tumbuh Bersama Komunitas',
          description:
            'Mendengarkan masukan, mendukung kolaborasi terbuka, dan membangun hubungan jangka panjang dengan pengguna kami.',
        },
        {
          title: 'Terus Berinovasi',
          description:
            'Terus menjelajahi ide dan teknologi baru agar solusi kami tetap relevan selama bertahun-tahun.',
        },
      ],
    },
    product: {
      metadataTitle: 'Produk',
      title: 'Produk Kami',
      description:
        'Daftar lengkap produk, situs web, dan alat yang telah dibangun dan dirawat oleh Nijushi Digital untuk membantu individu dan bisnis menemukan #YourDecision.',
      visitProduct: 'Kunjungi Produk',
      github: 'GitHub',
    },
    social: {
      metadataTitle: 'Media Sosial',
      title: 'Media Sosial Kami',
      description:
        'Tetap terhubung dan dapatkan pembaruan, berita, dan konten di balik layar dari Nijushi Digital melalui akun media sosial resmi kami di bawah ini.',
      warning:
        'Semua akun resmi tercantum di halaman ini. Akun lainnya yang Anda temukan di tempat lain tidak terafiliasi dengan kami.',
      reportTitle: 'Menemukan Akun Palsu?',
      reportDescription:
        'Jika Anda menemukan akun yang mengatasnamakan Nijushi Digital atau merek kami, laporkan melalui Nishia Customer Support agar kami dapat bertindak sesegera mungkin.',
      reportButton: 'Laporkan Sekarang',
    },
    legal: {
      privacyTitle: 'Kebijakan Privasi',
      privacyDescription: 'Cara Nijushi Digital mengumpulkan, menggunakan, dan melindungi data Anda.',
      termsTitle: 'Ketentuan Layanan',
      termsDescription: 'Syarat dan ketentuan untuk menggunakan layanan Nijushi Digital.',
      cookieTitle: 'Kebijakan Cookie',
      cookieDescription: 'Bagaimana Nijushi Digital menggunakan cookie dan teknologi pelacakan serupa.',
    },
    footer: {
      company: 'Perusahaan',
      legal: 'Hukum',
      home: 'Beranda',
      about: 'Tentang Perusahaan',
      product: 'Produk',
      privacy: 'Kebijakan Privasi',
      terms: 'Ketentuan Layanan',
      servicesFee: 'Kebijakan Biaya Layanan',
      cookiePolicy: 'Kebijakan Cookie',
      description: 'Memberdayakan dunia Anda melalui solusi digital yang cerdas.',
      copyright: '© Nijushi Digital',
      mainWebsite: 'Situs Utama Perusahaan',
      aboutCompany: 'Tentang Perusahaan Utama',
    },
    common: {
      contactUs: 'Hubungi Kami',
      learnMore: 'Pelajari Lebih Lanjut',
      startJourney: 'Mulai Perjalanan',
    },
  },
  en: {
    nav: {
      home: 'Home',
      product: 'Product',
      about: 'About Company',
      contact: 'Contact Us',
      switchLanguage: 'Switch Language',
    },
    home: {
      metadataTitle: 'Home',
      heroDescription:
        'Empower your digital future with intelligent solutions designed for those who value control and autonomy.',
      heroButton: 'Learn More',
      scrollLanjut: 'Scroll To Continue Reading',
      featuresTitle: 'Our Products',
      featuresDescription:
        'Nijushi Digital strives to always provide and create products and services that can help many parties, and here are some of the ones we have worked on:',
      featuresButton: 'See All Products',
      socialTitle: "Let's Connect",
      socialDescription:
        'Follow us on social media for updates, news, and behind-the-scenes content.',
      ctaTitle: 'Interested in Working Together?',
      ctaDescription: 'You can contact us as soon as you can! #YourDecision awaits.',
      ctaButton: 'Start The Journey',
    },
    about: {
      metadataTitle: 'About',
      heroTitle: "",
      heroDescription:
        'Nijushi Digital is a digital studio that builds websites, tools and other services for individuals and businesses who need reliable digital solutions. Everything is in under your control, not ours!',
      visionTitle: 'Our Vision',
      visionLead: '"Be your best business partner"',
      visionSupport:
        'We believe a healthy business should benefit both parties, not just one party.',
      missionTitle: 'Our Mission',
      missionDescription: 'The principles that guide everything we build at Nijushi Digital.',
      missions: [
        {
          title: 'Building Reliable Products',
          description:
            "Providing digital products and services that are fast, affordable, and truly beneficial to each party's needs.",
        },
        {
          title: 'Always Transparent',
          description:
            'Design solutions that return control to you — transparent, safe, and free from unnecessary attachments.',
        },
        {
          title: 'Grow With The Community',
          description:
            'Listen to feedback, support open collaboration, and build long-term relationships with the people we serve.',
        },
        {
          title: 'Keep Innovating',
          description:
            'Continuously explore new ideas and technologies so our solutions stay relevant for years to come.',
        },
      ],
    },
    product: {
      metadataTitle: 'Products',
      title: 'Our Products',
      description:
        'A full list of products, websites, and tools that Nijushi Digital has built and maintained to help individuals and businesses find #YourDecision.',
      visitProduct: 'Visit Product',
      github: 'GitHub',
    },
    social: {
      metadataTitle: 'Social Media',
      title: 'Our Social Media',
      description:
        'Stay connected and get the latest updates, news, and behind-the-scenes content from Nijushi Digital through our official social media accounts below.',
      warning:
        'All official accounts are listed on this page. Any other accounts you may find elsewhere are not affiliated with us.',
      reportTitle: 'Found a Fake Account?',
      reportDescription:
        'If you come across an account impersonating Nijushi Digital or any of our brands, please report it to us through Nishia Customer Support so we can take action as soon as possible.',
      reportButton: 'Report It!',
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      privacyDescription: 'How Nijushi Digital collects, uses, and protects your personal data.',
      termsTitle: 'Terms of Service',
      termsDescription: 'Terms and conditions for using Nijushi Digital services.',
      cookieTitle: 'Cookie Policy',
      cookieDescription: 'How Nijushi Digital uses cookies and similar tracking technologies.',
    },
    footer: {
      company: 'Company',
      legal: 'Legal',
      home: 'Home',
      about: 'About Company',
      product: 'Product',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      servicesFee: 'Service Fee Policy',
      description: 'Empowering your world through intelligent digital solutions.',
      copyright: '© Nijushi Digital',
      mainWebsite: 'Company Main Website',
      aboutCompany: 'About Main Company',
    },
    common: {
      contactUs: 'Contact Us',
      learnMore: 'Learn More',
      startJourney: 'Start The Journey',
    },
  },
} as const