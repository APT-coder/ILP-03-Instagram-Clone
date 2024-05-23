import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("signup").addEventListener("click", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("username", username);
      alert("Register success");
      window.location.href="../html/login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

window.openPlayStore = function() {
  window.location.href = "https://play.google.com/store/search?q=instagram&c=apps&hl=en";
};

window.openMicrosoftStore = function() {
  window.location.href = "https://apps.microsoft.com/en-us/detail/9nblggh5l9xt";
};