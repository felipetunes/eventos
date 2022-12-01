// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/*
const firebaseConfig = {
  apiKey: "AIzaSyAplOxk19O6OFNiuqRQVRlSeE2PROJEfMw",
  authDomain: "eventos-8a368.firebaseapp.com",
  projectId: "eventos-8a368",
  storageBucket: "eventos-8a368.appspot.com",
  messagingSenderId: "762440793921",
  appId: "1:762440793921:web:55e589850fe1451e9a6bc0"
};
*/

/*
const firebaseConfig = {
  apiKey: "AIzaSyArIhcKeb9iUt6ppiCXZmieZ1OLIABk_KI",
  authDomain: "eventos2-5b0d5.firebaseapp.com",
  projectId: "eventos2-5b0d5",
  storageBucket: "eventos2-5b0d5.appspot.com",
  messagingSenderId: "849734484205",
  appId: "1:849734484205:web:b691abe99d84852175cce4"
};
*/


const firebaseConfig = {
  apiKey: "AIzaSyCitsmWlSG2VqnCa7qlEA8RyojHXOSvuXM",
  authDomain: "eventos3-afea6.firebaseapp.com",
  projectId: "eventos3-afea6",
  storageBucket: "eventos3-afea6.appspot.com",
  messagingSenderId: "337109204869",
  appId: "1:337109204869:web:b783d512b0cb593d47ceec"
};


/*
const firebaseConfig = {
  apiKey: "AIzaSyBR3O3EFTcRgzZ4vz1b0MkiUKblxme_OXE",
  authDomain: "eventos-4.firebaseapp.com",
  projectId: "eventos-4",
  storageBucket: "eventos-4.appspot.com",
  messagingSenderId: "226870283224",
  appId: "1:226870283224:web:d8ac70b773ec325ad9c0ad"
};
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);

export {
    db,
    auth,
    storage
}

export default app;