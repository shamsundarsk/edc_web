import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

export async function GET(req: Request, { params }: any) {
  try {
    const col = 'events';
    const id = params.id;
    const doc = await firestore.collection(col).doc(id).get();
    if (!doc.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, item: { id: doc.id, ...doc.data() } });
  } catch (err: any) {
    console.error('API GET item error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: any) {
  try {
    const col = 'events';
    const id = params.id;
    const body = await req.json();
    body.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    await firestore.collection(col).doc(id).set(body, { merge: true });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API PATCH error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const col = 'events';
    const id = params.id;
    await firestore.collection(col).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API DELETE error:', err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}
