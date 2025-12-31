'use client';

import { usePathname } from 'next/navigation';

interface SEOSchemaProps {
  type?: 'article' | 'event' | 'person' | 'organization';
  title?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export default function SEOSchema({
  type = 'organization',
  title,
  description,
  image,
  datePublished,
  dateModified,
  author
}: SEOSchemaProps) {
  const pathname = usePathname();
  const baseUrl = 'https://edc-cit.vercel.app';
  const currentUrl = `${baseUrl}${pathname}`;

  const getSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      url: currentUrl,
      name: title,
      description: description,
      image: image || `${baseUrl}/og-image.jpg`,
    };

    switch (type) {
      case 'article':
        return {
          ...baseSchema,
          '@type': 'Article',
          headline: title,
          datePublished: datePublished,
          dateModified: dateModified || datePublished,
          author: {
            '@type': 'Organization',
            name: author || 'Entrepreneurship Development Cell CIT',
            url: baseUrl
          },
          publisher: {
            '@type': 'Organization',
            name: 'Entrepreneurship Development Cell CIT',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`
            }
          }
        };

      case 'event':
        return {
          ...baseSchema,
          '@type': 'Event',
          startDate: datePublished,
          location: {
            '@type': 'Place',
            name: 'Coimbatore Institute of Technology',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Coimbatore',
              addressRegion: 'Tamil Nadu',
              addressCountry: 'IN'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'Entrepreneurship Development Cell CIT',
            url: baseUrl
          }
        };

      case 'person':
        return {
          ...baseSchema,
          '@type': 'Person',
          jobTitle: 'Student Entrepreneur',
          affiliation: {
            '@type': 'Organization',
            name: 'Coimbatore Institute of Technology'
          }
        };

      default:
        return {
          ...baseSchema,
          '@type': 'Organization'
        };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  );
}