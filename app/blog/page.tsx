// app/blog/page.tsx (server component)
import { firestore } from '@/lib/firebaseAdmin';
import SideNav from '@/app/components/SideNav';

export default async function BlogList() {
  let posts: any[] = [];
  
  try {
    const snapshot = await firestore.collection('blogs').orderBy('createdAt','desc').get();
    posts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/blog" />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        <div className="mt-12 mb-20 text-center border-b border-foreground/10 pb-12">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">Blog</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">Insights and perspectives from our entrepreneurship journey</p>
        </div>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <div className="text-center py-24 liquid-glass rounded-xl">
              <p className="text-foreground/50 text-lg font-light">No articles published yet</p>
            </div>
          ) : (
            posts.map(p => (
              <a key={p.id} href={`/blog/${p.slug}`} className="group block liquid-glass rounded-xl p-8 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-8">
                  {p.imageUrl && (
                    <div className="md:w-96 h-64 overflow-hidden rounded-lg relative">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-[#EE6983]/20 group-hover:bg-[#EE6983]/10 transition-all duration-700"></div>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-xs text-foreground/50 uppercase tracking-widest mb-4 font-light">
                      {p.createdAt?.toDate ? new Date(p.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">{p.title}</h3>
                    {p.content && (
                      <p className="text-foreground/70 text-base leading-relaxed line-clamp-3 font-light">{p.content.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                    )}
                    <div className="mt-6 inline-block px-4 py-1.5 bg-[#850E35] text-[#EE6983] text-xs font-medium rounded-full hover:bg-[#850E35]/90 transition-all duration-300">
                      Read Article →
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
