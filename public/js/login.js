$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        autoplayTimeout: 5000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });
})

import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("login").addEventListener("click", function(event) {
  event.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("usermail", email);
      alert("Login success");
      window.location.href="../html/homeandfeed.html";
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