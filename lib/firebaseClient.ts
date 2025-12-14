// lib/firebaseClient.ts
import { initializeApp, getApps } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const dbClient = getFirestore();
export const authClient = getAuth();

export async function uploadImageClient(file: File, path = 'images') {
  const filename = `${Date.now()}-${file.name}`;
  const fileRef = storageRef(storage, `${path}/${filename}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return { url, path: `${path}/${filename}` };
}
