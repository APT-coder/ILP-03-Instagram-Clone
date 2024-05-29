import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

export { auth };
