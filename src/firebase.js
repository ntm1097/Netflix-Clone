import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA4KJFystxz1aeW_V-yXcOg9BpeR91H4Ag",
  authDomain: "netflix-clone-8ff2f.firebaseapp.com",
  projectId: "netflix-clone-8ff2f",
  storageBucket: "netflix-clone-8ff2f.firebasestorage.app",
  messagingSenderId: "648308529442",
  appId: "1:648308529442:web:55a6edf695dd597ea42d7b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
    const res =  await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
 }

 const login = async (email, password) => {
    try {
         await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
 }

 const logout = () => { 
    signOut(auth);
 }

 export {auth, db, login, signup, logout};
