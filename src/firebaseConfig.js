
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore,doc, getDoc ,setDoc  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCP0ym6HByWXGhC4qqMoEzOlWT74NZos5U",
    authDomain: "work-shop-issat.firebaseapp.com",
    databaseURL: "https://work-shop-issat-default-rtdb.firebaseio.com",
    projectId: "work-shop-issat",
    storageBucket: "work-shop-issat.firebasestorage.app",
    messagingSenderId: "101028528145",
    appId: "1:101028528145:web:e9c9195e1274a58a1171b0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Firebase Auth
export const db = getFirestore(app); // Firestore Database

// Function to get user role
export const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data().role : 'user';
  };
  
  // Set user role in Firestore
export const setUserRole = async (uid, email, role) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      email: email,
      role: role,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};