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
        {/* Enhanced JSON-LD Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Entrepreneurship Development Cell - Coimbatore Institute of Technology',
              alternateName: 'EDC CIT',
              url: 'https://edc-cit.vercel.app',
              logo: 'https://edc-cit.vercel.app/logo.png',
              image: 'https://edc-cit.vercel.app/og-image.jpg',
              description: 'Leading Entrepreneurship Development Cell at Coimbatore Institute of Technology. Empowering student entrepreneurs through mentorship, workshops, startup incubation, and innovation programs.',
              foundingDate: '2020',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Coimbatore',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN',
                postalCode: '641014'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'edc@cit.edu.in',
                contactType: 'Customer Service',
                availableLanguage: ['English', 'Tamil']
              },
              sameAs: [
                'https://www.instagram.com/edc_cit',
                'https://www.linkedin.com/company/edc-cit',
                'https://twitter.com/edc_cit'
              ],
              parentOrganization: {
                '@type': 'EducationalOrganization',
                name: 'Coimbatore Institute of Technology',
                url: 'https://www.cit.edu.in'
              },
              department: {
                '@type': 'Organization',
                name: 'Innovation and Entrepreneurship',
                description: 'Fostering innovation and entrepreneurial mindset among students'
              },
              offers: {
                '@type': 'Service',
                name: 'Entrepreneurship Development Programs',
                description: 'Comprehensive programs including mentorship, workshops, incubation support, and startup funding guidance'
              }
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Entrepreneurship Development Cell CIT',
              url: 'https://edc-cit.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://edc-cit.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </body>
    </html>
  );
}
