// app/blog/[slug]/page.tsx
import { firestore } from '@/lib/firebaseAdmin';
import SideNav from '@/app/components/SideNav';
import { notFound } from 'next/navigation';
import './blog-detail.css';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = params;
  
  let post: any = null;
  
  try {
    // Fetch the blog post by slug
    const snapshot = await firestore.collection('blogs').where('slug', '==', slug).limit(1).get();
    
    if (snapshot.empty) {
      notFound();
    }
    
    const doc = snapshot.docs[0];
    post = { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/blog" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        <article className="mt-12">
          {/* Header */}
          <header className="mb-12 pb-12 border-b border-foreground/10">
            <div className="text-xs text-foreground/50 uppercase tracking-widest mb-6 font-light">
              {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''}
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            {post.author && (
              <div className="text-foreground/70 font-light">
                By <span className="text-foreground">{post.author}</span>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-12 border border-foreground/10 overflow-hidden rounded-lg">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="blog-content">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-12 border-t border-foreground/10">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="px-4 py-2 border border-foreground/20 text-foreground/70 text-sm uppercase tracking-wider font-light hover:border-foreground/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 pt-12 border-t border-foreground/10 text-center">
            <a 
              href="/blog"
              className="inline-block text-foreground text-sm uppercase tracking-widest hover:tracking-wider transition-all duration-300 border-b border-foreground/30 hover:border-foreground pb-1"
            >
              ← Back to All Articles
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
