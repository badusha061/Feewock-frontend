import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDJ-ENFyfWCTG3aVuxFvrNz7mbz1D1Em8g",
  authDomain: "phone-number-4fac2.firebaseapp.com",
  projectId: "phone-number-4fac2",
  storageBucket: "phone-number-4fac2.appspot.com",
  messagingSenderId: "26374945341",
  appId: "1:26374945341:web:dbdb62afbd4a1459ebc854",
  measurementId: "G-CHY6KV4SDY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)