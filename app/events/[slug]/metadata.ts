import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events?slug=${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return {
        title: 'Event Not Found | EDC Cell',
      };
    }
    
    const data = await res.json();
    const event = data.items?.[0];
    
    if (!event) {
      return {
        title: 'Event Not Found | EDC Cell',
      };
    }
    
    return {
      title: `${event.title} | EDC Cell Events`,
      description: event.description || 'Join us for this exciting event',
      openGraph: {
        title: event.title,
        description: event.description,
        images: event.imageUrl ? [event.imageUrl] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description: event.description,
        images: event.imageUrl ? [event.imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Event | EDC Cell',
    };
  }
}
