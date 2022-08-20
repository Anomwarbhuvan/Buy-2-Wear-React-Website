import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuOqijT7Xk5yMIAablnmLTgn-RRzArFtc",
    authDomain: "buy-2-wear-db.firebaseapp.com",
    projectId: "buy-2-wear-db",
    storageBucket: "buy-2-wear-db.appspot.com",
    messagingSenderId: "841793412198",
    appId: "1:841793412198:web:23627f738fa33491d8e1a7"
};
  

  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt }
      );
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;

};

  //if user data exists
  // return userDocref


  //if user data does not exist
  // create , set the document with the data from userAuth in my collection
  
