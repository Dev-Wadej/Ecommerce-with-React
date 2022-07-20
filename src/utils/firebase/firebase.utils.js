import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCZDUjatw5HAasLMBOz1CnraNwRHozesPU',
    authDomain: 'crown-clothings-db-65f62.firebaseapp.com',
    projectId: 'crown-clothings-db-65f62',
    storageBucket: 'crown-clothings-db-65f62.appspot.com',
    messagingSenderId: '106224831050',
    appId: '1:106224831050:web:7d91625cc800f6400374b3',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    // doc(db, 'users', userAuth.uid);

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            alert('There was an error creating the user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(
    email,
    password
) => {
    if (!email || !password) return;
    const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return response;
};

export const signInAuthUserWithEmailAndPassword = async(
    email,
    password
) => {
    if (!email || !password) return;
    const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return response;
};
export const signOutUser = async() => {
    await signOut(auth);
};
export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/// Storing data in firestore starts here

export const addCollectionAndDocuments = async(
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    // .reduce(
    //     (acc, docSnapshot) => {
    //         const { title, items } = docSnapshot.data();
    //         acc[title.toLowerCase()] = items;
    //         return acc;
    //     }, {}
    // );
    // return categoryMap;
};