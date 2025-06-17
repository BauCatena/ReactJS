
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg7Cji1PBlagzeks7pWr2K9UH58kU8BNg",
  authDomain: "circolo-nero-b5ebf.firebaseapp.com",
  projectId: "circolo-nero-b5ebf",
  storageBucket: "circolo-nero-b5ebf.firebasestorage.app",
  messagingSenderId: "229694832056",
  appId: "1:229694832056:web:79bf98773a43956581234d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);