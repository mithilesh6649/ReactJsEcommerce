
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA5w1K1Q3BPcGIeHwAh8ilaml0i2Kocxf0",
    authDomain: "shop-cc4c4.firebaseapp.com",
    projectId: "shop-cc4c4",
    storageBucket: "shop-cc4c4.firebasestorage.app",
    messagingSenderId: "288667833579",
    appId: "1:288667833579:web:66082a7e27d8a825375aae",
    measurementId: "G-V7GQNZRJZX"
};

// Initialize Firebase
const firebaseConfigApp = initializeApp(firebaseConfig);

export default firebaseConfigApp;