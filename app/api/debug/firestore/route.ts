import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const collections = ['members', 'blogs', 'events', 'gallery'];
    const results: any = {};

    for (const collection of collections) {
      try {
        // Try to get all documents without ordering
        const snapshot = await firestore.collection(collection).get();
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
          hasOrder: doc.data().order !== undefined
        }));

        results[collection] = {
          total: snapshot.size,
          docs: docs.slice(0, 3), // Show first 3 for debugging
          hasOrderField: docs.filter(d => d.hasOrder).length
        };
      } catch (error) {
        results[collection] = {
          error: error.message
        };
      }
    }

    return NextResponse.json({ 
      success: true, 
      debug: results,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Debug error:', err);
    return NextResponse.json({ 
      error: err.message || 'Debug failed',
      stack: err.stack 
    }, { status: 500 });
  }
}