import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1qk4Q3QY3g8q0y4w8ulU-8GbQV-juiME",
  authDomain: "twiller-7a566.firebaseapp.com",
  projectId: "twiller-7a566",
  storageBucket: "twiller-7a566.appspot.com",
  messagingSenderId: "458273273225",
  appId: "1:458273273225:web:00d2c894846910179e5d58",
  measurementId: "G-W26ENF7R2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
//const analytics = getAnalytics(app);
