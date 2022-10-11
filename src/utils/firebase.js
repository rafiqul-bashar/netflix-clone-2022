import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCezh4lRQvp2VCS0Ut_xfIy9BijC9AlIKQ",
  authDomain: "netlfix-clone-bd7a3.firebaseapp.com",
  projectId: "netlfix-clone-bd7a3",
  storageBucket: "netlfix-clone-bd7a3.appspot.com",
  messagingSenderId: "777865075297",
  appId: "1:777865075297:web:a4679c2fd7da96f5bc6820",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { auth };
export default db;
