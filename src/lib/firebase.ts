import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'fancy-todos-aa473.firebaseapp.com',
  projectId: 'fancy-todos-aa473',
  storageBucket: 'fancy-todos-aa473.appspot.com',
  messagingSenderId: '752409474577',
  appId: '1:752409474577:web:657696f5714bcdfe73e3b0',
  measurementId: 'G-1RHMG6LB5P',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
