// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZEeVXXi2FQgjHnkGWo4y0WuvzOVBLGhs",
  authDomain: "simpleapp-10809.firebaseapp.com",
  projectId: "simpleapp-10809",
  storageBucket: "simpleapp-10809.appspot.com",
  messagingSenderId: "223850708422",
  appId: "1:223850708422:web:abfee65088609c24b986c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);