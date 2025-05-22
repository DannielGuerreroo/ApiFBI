import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCai3l8zVGGaDU2wn3Zw89uBT3CWv2DTFU",
  authDomain: "api2025-58216.firebaseapp.com",
  projectId: "api2025-58216",
  storageBucket: "api2025-58216.firebasestorage.app",
  messagingSenderId: "776434248441",
  appId: "1:776434248441:web:c8d3ec14e88e296a451028",
  measurementId: "G-4GR5JRDMN3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };