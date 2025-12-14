// app/gallery/page.tsx (server component)
import { firestore } from '@/lib/firebaseAdmin';
import SideNav from '@/app/components/SideNav';
import GalleryGrid from '@/app/components/GalleryGrid';

export default async function GalleryPage() {
  let items: any[] = [];
  
  try {
    const snapshot = await firestore.collection('gallery').orderBy('createdAt','desc').get();
    items = snapshot.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        imageUrl: data.imageUrl || '',
        caption: data.caption || '',
      };
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
  }
  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/gallery" />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        <div className="mt-12 mb-20 text-center border-b border-foreground/10 pb-12">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">Gallery</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">Moments captured from our events and activities</p>
        </div>

        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
