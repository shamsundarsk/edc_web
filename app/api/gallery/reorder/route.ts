import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    // Update each gallery item with new order
    const batch = firestore.batch();
    
    items.forEach((item, index) => {
      const docRef = firestore.collection('gallery').doc(item.id);
      batch.update(docRef, { order: index });
    });

    await batch.commit();

    return NextResponse.json({ success: true, message: 'Order updated successfully' });
  } catch (err: any) {
    console.error('Reorder error:', err);
    return NextResponse.json({ error: err.message || 'Failed to reorder' }, { status: 500 });
  }
}