import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, studentId, year } = body;

    // Validate required fields
    if (!name || !email || !studentId || !year) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
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

    // Check if email already exists
    const existingApplication = await firestore
      .collection('applications')
      .where('email', '==', email)
      .get();

    if (!existingApplication.empty) {
      return NextResponse.json(
        { success: false, message: 'An application with this email already exists' },
        { status: 409 }
      );
    }

    // Save to Firestore
    const applicationRef = await firestore.collection('applications').add({
      name,
      email,
      studentId,
      year,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      id: applicationRef.id,
    });
  } catch (error: any) {
    console.error('Join form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
