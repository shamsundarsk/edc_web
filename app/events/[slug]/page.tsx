// app/events/[slug]/page.tsx
import { firestore } from '@/lib/firebaseAdmin';
import SideNav from '@/app/components/SideNav';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EventMediaSlider from '@/app/events/[slug]/EventMediaSlider';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = params;
  
  let event: any = null;
  
  try {
    // Try to fetch by slug first
    let snapshot = await firestore.collection('events').where('slug', '==', slug).limit(1).get();
    
    // If not found by slug, try by ID
    if (snapshot.empty) {
      try {
        const docRef = await firestore.collection('events').doc(slug).get();
        if (docRef.exists) {
          event = { id: docRef.id, ...docRef.data() };
        }
      } catch (idError) {
        console.log('Failed to fetch by ID, trying title match...');
        // Last resort: try to find by title (for debugging)
        const titleSnapshot = await firestore.collection('events').where('title', '==', decodeURIComponent(slug)).limit(1).get();
        if (!titleSnapshot.empty) {
          const doc = titleSnapshot.docs[0];
          event = { id: doc.id, ...doc.data() };
        }
      }
    } else {
      const doc = snapshot.docs[0];
      event = { id: doc.id, ...doc.data() };
    }
    
    if (!event) {
      console.error(`Event not found for slug: ${slug}`);
      notFound();
    }
  } catch (error) {
    console.error('Error loading event:', error);
    notFound();
  }

  // Build media array from all available sources
  const allMedia = [
    // Main video
    ...(event.videoUrl ? [{ type: 'video', url: event.videoUrl }] : []),
    // Additional videos
    ...(event.videos || []).map((url: string) => ({ type: 'video', url })),
    // Main image (if not already in images array)
    ...(event.imageUrl && !(event.images || []).includes(event.imageUrl) ? [{ type: 'image', url: event.imageUrl }] : []),
    // Additional images
    ...(event.images || []).map((url: string) => ({ type: 'image', url }))
  ].filter(media => media.url && media.url.trim() !== ''); // Filter out empty URLs

  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/events" />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        <article className="mt-12">
          {/* Header */}
          <header className="mb-12 pb-12 border-b border-foreground/10">
            <div className="text-xs text-foreground/50 uppercase tracking-widest mb-6 font-light">
              {event.date}
              {event.location && <span className="ml-4">• {event.location}</span>}
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {event.title}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              {event.description}
            </p>
          </header>

          {/* Media Slider */}
          {allMedia.length > 0 && (
            <EventMediaSlider media={allMedia} eventTitle={event.title} />
          )}

          {/* Action Buttons */}
          <div className="mb-12 flex flex-wrap gap-4">
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#850E35] text-[#EE6983] font-semibold rounded-full hover:bg-[#850E35]/90 transition-all transform hover:scale-105 shadow-lg"
              >
                Register Now
              </a>
            )}
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, '')}T100000Z/${event.date.replace(/-/g, '')}T120000Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 liquid-glass border border-foreground/20 text-foreground font-semibold rounded-full hover:shadow-lg transition-all"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                </svg>
                Add to Calendar
              </span>
            </a>
          </div>

          {/* Back to Events */}
          <div className="mt-16 pt-12 border-t border-foreground/10 text-center">
            <Link 
              href="/events"
              className="inline-block text-foreground text-sm uppercase tracking-widest hover:tracking-wider transition-all duration-300 border-b border-foreground/30 hover:border-foreground pb-1"
            >
              ← Back to All Events
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
