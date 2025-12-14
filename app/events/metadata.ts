import { Metadata } from 'next';
import { generatePageMetadata } from '@/app/metadata';

export const eventsMetadata: Metadata = generatePageMetadata(
  'Events & Workshops - EDC Cell',
  'Discover upcoming entrepreneurship workshops, hackathons, ideathons, and networking events. Join us to learn, innovate, and connect with fellow entrepreneurs.',
  '/events'
);

export function generateEventSchema(event: {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: event.imageUrl || 'https://edccell.edu/og-image.jpg',
    startDate: event.date,
    endDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'College Campus',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'EDC Cell Coimbatore',
      url: 'https://edccell.edu'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://edccell.edu/events#${event.id}`
    }
  };
}

export function generateEventsListSchema(events: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        url: `https://edccell.edu/events#${event.id}`
      }
    }))
  };
}
