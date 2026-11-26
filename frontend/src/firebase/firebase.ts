import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVfrAWaWBqlqNtmOGNCChM-KMl82TcjVI",
  authDomain: "data-disneyplus.firebaseapp.com",
  databaseURL: "https://data-disneyplus-default-rtdb.firebaseio.com",
  projectId: "data-disneyplus",
  storageBucket: "data-disneyplus.firebasestorage.app",
  messagingSenderId: "10883134416",
  appId: "1:10883134416:web:8f4340f92422ad7ff13fd5"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);