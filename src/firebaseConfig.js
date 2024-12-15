
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore,doc, getDoc ,setDoc  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxx",
    databaseURL: "xxxxxxxm",
    projectId: "xxxxxxt",
    storageBucket: "xxxxxxx",
    messagingSenderId: "xxxxxxxx5",
    appId: "xxxxxxxxxxxx0"
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
