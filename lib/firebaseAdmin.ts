// lib/firebaseAdmin.ts
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!sa) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT env var is not set. Paste your service account JSON as a single-line string in .env.local');
  }
  const serviceAccount = JSON.parse(sa);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const firestore = admin.firestore();
export const adminStorage = admin.storage();
export default admin;
