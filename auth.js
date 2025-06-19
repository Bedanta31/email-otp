// Firebase v9+ modular syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDqsWJgwX-vWIawPZt0XTnQHSE9AqwczkE",
  authDomain: "word-finder-346db.firebaseapp.com",
  projectId: "word-finder-346db",
  storageBucket: "word-finder-346db.firebasestorage.app",
  messagingSenderId: "129230255125",
  appId: "1:129230255125:web:39632d82bb30c55c318a1c"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup with verification
window.signup = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      sendEmailVerification(user).then(() => {
        alert("Verification email sent! Please check your inbox & Spam Folder.");
      });
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
};

// Login and check verification
window.login = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user.emailVerified) {
        document.getElementById("status").innerText = "✅ Logged in and Verified";
      } else {
        alert("Please verify your email before logging in.");
        signOut(auth);
      }
    })
    .catch(error => {
      alert("Login Error: " + error.message);
    });
};
