import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from './metadata';
import IntroWrapper from './components/IntroWrapper';

const inter = Inter({ subsets: ['latin'] });
const fraunces = Fraunces({ 
  subsets: ['latin'], 
  axes: ['SOFT', 'WONK', 'opsz']
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${inter.className} ${fraunces.className}`}>
        <IntroWrapper>
          {children}
        </IntroWrapper>
        {/* JSON-LD Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Entrepreneurship Development Cell Coimbatore',
              url: 'https://edccell.edu',
              logo: 'https://edccell.edu/logo.png',
              description: 'Entrepreneurship Development Cell fostering innovation and startup culture among students',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Coimbatore',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'edccell@college.edu',
                contactType: 'Customer Service'
              },
              sameAs: [
                'https://www.instagram.com/edccell',
                'https://www.linkedin.com/company/edccell'
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
