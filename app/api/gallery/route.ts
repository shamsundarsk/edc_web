import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ error: 'Empty body' }, { status: 400 });
    const id = body.id || undefined;
    const col = 'gallery';
    let docRef;
    if (id) docRef = firestore.collection(col).doc(String(id));
    else docRef = firestore.collection(col).doc();
    const data = Object.assign({}, body);
    delete data.id;
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    
    // If no order is specified, set it to the end of the list
    if (data.order === undefined) {
      const snapshot = await firestore.collection(col).get();
      data.order = snapshot.size;
    }
    
    await docRef.set(data);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: any) {
    console.error('API POST error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const col = 'gallery';
    
    // First, check if any documents exist at all
    const allDocsSnapshot = await firestore.collection(col).limit(1).get();
    if (allDocsSnapshot.empty) {
      return NextResponse.json({ success: true, items: [] });
    }
    
    // Check if the first document has an order field
    const firstDoc = allDocsSnapshot.docs[0];
    const hasOrderField = firstDoc.data().order !== undefined;
    
    let snapshot;
    if (hasOrderField) {
      // Get all documents with order field
      snapshot = await firestore.collection(col).orderBy('order', 'asc').get();
    } else {
      // No order field exists, perform migration
      console.log('No order field found for gallery, performing migration...');
      
      // Get all documents ordered by createdAt
      snapshot = await firestore.collection(col).orderBy('createdAt', 'asc').get();
      
      // Assign order values to all documents
      const batch = firestore.batch();
      snapshot.docs.forEach((doc, index) => {
        batch.update(doc.ref, { order: index });
      });
      await batch.commit();
      
      // Re-fetch with order field
      snapshot = await firestore.collection(col).orderBy('order', 'asc').get();
    }
    
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('API GET error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}
