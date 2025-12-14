// app/events/page.tsx (server component)
import { firestore } from '@/lib/firebaseAdmin';
import SideNav from '@/app/components/SideNav';
import Link from 'next/link';

export default async function EventsPage() {
  let items: any[] = [];
  
  try {
    const snapshot = await firestore.collection('events').orderBy('createdAt','desc').get();
    items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching events:', error);
  }
  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/events" />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        <div className="mt-12 mb-20 text-center border-b border-foreground/10 pb-12">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">Events</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">Workshops, seminars, and networking opportunities</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-24 liquid-glass rounded-xl">
              <p className="text-foreground/50 text-lg font-light">No events scheduled</p>
            </div>
          ) : (
            items.map(ev => (
              <Link 
                key={ev.id} 
                href={`/events/${ev.slug || ev.id}`}
                className="group liquid-glass hover:shadow-xl transition-all duration-500 overflow-hidden rounded-xl block"
              >
                {ev.imageUrl && (
                  <div className="h-64 overflow-hidden bg-gray-900 relative">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    {ev.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-8">
                  <div className="text-xs text-foreground/50 uppercase tracking-widest mb-4 font-light flex items-center justify-between">
                    <span>{ev.date}</span>
                    {ev.location && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {ev.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-foreground/80 transition-colors">{ev.title}</h3>
                  <p className="text-foreground/70 leading-relaxed font-light line-clamp-3">{ev.description}</p>
                  <div className="mt-6 inline-block px-6 py-2 bg-[#850E35] text-[#EE6983] text-sm font-medium rounded-full hover:bg-[#850E35]/90 transition-all duration-300">
                    View Details →
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
