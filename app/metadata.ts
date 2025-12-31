import { Metadata } from 'next';

const siteConfig = {
  name: 'Entrepreneurship Development Cell Coimbatore | EDC CIT',
  description: 'Leading Entrepreneurship Development Cell at Coimbatore Institute of Technology. Empowering student entrepreneurs through mentorship, workshops, startup incubation, and innovation programs. Join 1000+ aspiring entrepreneurs.',
  url: 'https://edc-cit.vercel.app',
  ogImage: 'https://edc-cit.vercel.app/og-image.jpg',
  keywords: [
    'Entrepreneurship Development Cell',
    'EDC Coimbatore',
    'EDC CIT',
    'Coimbatore Institute of Technology',
    'Student Entrepreneurs',
    'Startup Support Coimbatore',
    'Innovation Cell CIT',
    'Entrepreneurship Programs Tamil Nadu',
    'Student Startups India',
    'Business Incubator Coimbatore',
    'Startup Mentorship Programs',
    'College Entrepreneurship Cell',
    'Innovation Hub Tamil Nadu',
    'Startup Ecosystem Coimbatore',
    'Young Entrepreneurs India',
    'Startup Events Coimbatore',
    'Business Plan Competition',
    'Ideathon Coimbatore',
    'Hackathon CIT',
    'Entrepreneurship Workshops',
    'Startup Funding Support',
    'Innovation Programs India',
    'Student Innovation Cell',
    'Entrepreneurship Education',
    'Startup Community Coimbatore'
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
