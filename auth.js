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
  apiKey: "AIzaSyDnKHoj2smR0z9zCZH5A9fJCsFokd9U_ag",
  authDomain: "otp-system-71b21.firebaseapp.com",
  projectId: "otp-system-71b21",
  storageBucket: "otp-system-71b21.firebasestorage.app",
  messagingSenderId: "767014524390",
  appId: "1:767014524390:web:5ca45f8a31fbbf194af227"
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
        alert("Verification email sent! Please check your inbox.");
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

// Track user state
onAuthStateChanged(auth, user => {
  if (user && user.emailVerified) {
    document.getElementById("status").innerText = "✅ Logged in and Verified";
  } else {
    document.getElementById("status").innerText = "❌ Not Verified or Not Logged In";
  }
});
