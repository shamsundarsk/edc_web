import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const contactRef = await firestore.collection('contacts').add({
      name,
      email,
      subject: subject || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: contactRef.id,
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
