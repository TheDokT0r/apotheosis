import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: "ttrpg-12502.firebaseapp.com",

  projectId: "ttrpg-12502",

  storageBucket: "ttrpg-12502.appspot.com",

  messagingSenderId: "799549263340",

  appId: "1:799549263340:web:21814a36be251e487a44c9",
};

export const firebaseApp = initializeApp(firebaseConfig);