import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV9-ADdvhYHJjsnwlYbwETo71IooBHAtY",
  authDomain: "eu-mais-rico.firebaseapp.com",
  projectId: "eu-mais-rico",
  storageBucket: "eu-mais-rico.firebasestorage.app",
  messagingSenderId: "374479889582",
  appId: "1:374479889582:web:da01fb87f144fe4219393f",
  measurementId: "G-032Y375MZ1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
