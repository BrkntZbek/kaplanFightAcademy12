import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Firestore modülünü ekleyin
import { getFirestore } from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCZbSRis4NANiJQxqwg-Z5sMQQyhZveSw0",
  authDomain: "kaplanfightacademy-86b8e.firebaseapp.com",
  projectId: "kaplanfightacademy-86b8e",
  storageBucket: "kaplanfightacademy-86b8e.appspot.com",
  messagingSenderId: "120319904391",
  appId: "1:120319904391:web:5eb488d55c936eb6668622"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();



export { auth };