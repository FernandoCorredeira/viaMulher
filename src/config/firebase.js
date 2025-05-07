
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore'

// Chave de acesso para o projeto no firebase
const firebaseConfig = {
    apiKey: "AIzaSyDX1zytF4FSLE8NiClSV5FoxscoANSkV_o",
    authDomain: "teste-via-aafc9.firebaseapp.com",
    projectId: "teste-via-aafc9",
    storageBucket: "teste-via-aafc9.firebasestorage.app",
    messagingSenderId: "472182359837",
    appId: "1:472182359837:web:1de9db950839c172c503f4"
  };

// Email do projeto: viamulher022@gmail.com


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app)

export { auth, db }