import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  GithubAuthProvider, 
  OAuthProvider 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwba15VJpqEXlzOZ6egKAdmv2oFiQ-0z4",
  authDomain: "taskmaster-app-5af3d.firebaseapp.com",
  projectId: "taskmaster-app-5af3d",
  storageBucket: "taskmaster-app-5af3d.firebasestorage.app",
  messagingSenderId: "158771660704",
  appId: "1:158771660704:web:681946e8b558c1a8a146c5",
  measurementId: "G-G7TB2Q4HEM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');