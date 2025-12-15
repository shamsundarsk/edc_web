import { Metadata } from 'next';

const siteConfig = {
  name: 'Entrepreneurship Development Cell Coimbatore',
  description: 'Entrepreneurship Development Cell at Coimbatore - Empowering student entrepreneurs through mentorship, workshops, and startup support programs.',
  url: 'https://your-vercel-domain.vercel.app', // Replace with your actual Vercel domain
  ogImage: 'https://your-vercel-domain.vercel.app/og-image.jpg',
  keywords: [
    'Entrepreneurship Development Cell',
    'EDC Coimbatore',
    'Student Entrepreneurs',
    'Startup Support',
    'Innovation Cell',
    'Entrepreneurship Programs',
    'Student Startups',
    'Business Incubator',
    'Startup Mentorship',
    'College Entrepreneurship',
    'Innovation Hub',
    'Startup Ecosystem'
  ]
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Entrepreneurship Development Cell Coimbatore' }],
  creator: 'Entrepreneurship Development Cell Coimbatore',
  publisher: 'Entrepreneurship Development Cell Coimbatore',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@edccell', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const generatePageMetadata = (
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      images: image ? [image] : [siteConfig.ogImage],
    },
    twitter: {
      title,
      description,
      images: image ? [image] : [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
  };
};

export default siteConfig;
