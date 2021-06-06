import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhQBlSIraG0Czfnary_vApEVkWM6yZkxE",
  authDomain: "react-shop-a23ac.firebaseapp.com",
  projectId: "react-shop-a23ac",
  storageBucket: "react-shop-a23ac.appspot.com",
  messagingSenderId: "57229367895",
  appId: "1:57229367895:web:9230823aa3a61b3e032112",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user " + err);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;