import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ error: 'Empty body' }, { status: 400 });
    const id = body.id || undefined;
    const col = 'announcements';
    let docRef;
    if (id) docRef = firestore.collection(col).doc(String(id));
    else docRef = firestore.collection(col).doc();
    const data = Object.assign({}, body);
    delete data.id;
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    await docRef.set(data);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: any) {
    console.error('API POST error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const col = 'announcements';
    const snapshot = await firestore.collection(col).orderBy('createdAt','desc').get();
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('API GET error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}
