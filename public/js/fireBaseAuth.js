import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD0HZUmVjkOcU5q7qrQzTrqtnP8ahrnGuQ",
    authDomain: "instagram-clone-e6e31.firebaseapp.com",
    projectId: "instagram-clone-e6e31",
    storageBucket: "instagram-clone-e6e31.appspot.com",
    messagingSenderId: "149085649400",
    appId: "1:149085649400:web:ae39fed794c69f53a6fe0d"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById("signup");
const login = document.getElementById("login");

submit.addEventListener("click", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Register success");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
})

login.addEventListener("click", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Login success");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
})