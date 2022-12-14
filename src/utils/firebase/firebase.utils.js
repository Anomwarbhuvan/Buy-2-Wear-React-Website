import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword ,signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc ,collection, writeBatch,query,getDocs} from 'firebase/firestore';

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
  
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider); 

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsAdd ) => {
 
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
 

  objectsAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);

  });

  await batch.commit();
  console.log('done');                                             
};


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);


  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

};

export const createUserDocumentFromAuth = async(userAuth, additionalInformation ={} ) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
 

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt , ...additionalInformation}
      );
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email,password);
  
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email,password);
  
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 


  // next : callback,
  // error : errorCallback,
  // complete : completedCallback
 

  //if user data exists
  // return userDocref


  //if user data does not exist
  // create , set the document with the data from userAuth in my collection
  
