// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA8auD1ZO4RoL6Cj1BgpppEF1r0P793Cxc",
	authDomain: "ai-art-13713.firebaseapp.com",
	projectId: "ai-art-13713",
	storageBucket: "ai-art-13713.appspot.com",
	messagingSenderId: "1005926125422",
	appId: "1:1005926125422:web:a89280e93f645cd3b53b7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
