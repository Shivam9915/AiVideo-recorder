import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBtpQ2W11plP460pBHuEVK8ET9K06okg4A",
    authDomain: "ai-project-b8ca0.firebaseapp.com",
    databaseURL: "https://ai-project-b8ca0-default-rtdb.firebaseio.com",
    projectId: "ai-project-b8ca0",
    storageBucket: "ai-project-b8ca0.firebasestorage.app",
    messagingSenderId: "407069747339",
    appId: "1:407069747339:web:d7b21db7ab4ade1a7a0c8e",
    measurementId: "G-ZWLNYHJWX8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { signInWithGoogle };
