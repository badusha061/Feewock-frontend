
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcJdGzngOZa10_BGQW4o8DaiufI6eS3cE",
  authDomain: "feewock-192fa.firebaseapp.com",
  projectId: "feewock-192fa",
  storageBucket: "feewock-192fa.appspot.com",
  messagingSenderId: "233226520295",
  appId: "1:233226520295:web:571b939a24f093f1458442",
  measurementId: "G-V08ZZ6C6HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export{auth}