import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';

// Function to generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 50); // Limit length
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // Simple password check
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all events
    const snapshot = await firestore.collection('events').get();
    const results = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const eventId = doc.id;
      
      // Check if slug is missing or invalid
      const needsSlugFix = !data.slug || 
                          data.slug.includes(' ') || 
                          data.slug.includes('http') || 
                          data.slug.length > 50;
      
      if (needsSlugFix && data.title) {
        const newSlug = generateSlug(data.title);
        
        // Update the event with new slug
        await firestore.collection('events').doc(eventId).update({
          slug: newSlug
        });
        
        results.push({
          id: eventId,
          title: data.title,
          oldSlug: data.slug || 'missing',
          newSlug: newSlug,
          fixed: true
        });
      } else {
        results.push({
          id: eventId,
          title: data.title,
          slug: data.slug,
          fixed: false
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Fixed ${results.filter(r => r.fixed).length} events`,
      results 
    });
  } catch (err: any) {
    console.error('Fix slugs error:', err);
    return NextResponse.json({ error: err.message || 'Failed to fix slugs' }, { status: 500 });
  }
}