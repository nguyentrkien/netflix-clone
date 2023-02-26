
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBFfVN3SEPnjx2fjFhnyXvW78GkR538qRc",
  authDomain: "netflix-clone-2030a.firebaseapp.com",
  projectId: "netflix-clone-2030a",
  storageBucket: "netflix-clone-2030a.appspot.com",
  messagingSenderId: "1067943344801",
  appId: "1:1067943344801:web:a125a52b482d46ec1a8ee0",
  measurementId: "G-BQL7TLGSZF"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);