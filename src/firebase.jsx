import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDgNCa0htBBgcFLnfwMy_pEmbRuNbWFnEg",
  authDomain: "blog-app-c6ac3.firebaseapp.com",
  projectId: "blog-app-c6ac3",
  storageBucket: "blog-app-c6ac3.appspot.com",
  messagingSenderId: "7985815949",
  appId: "1:7985815949:web:4740937c72dc3324b91dc4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()