import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDl8e8nXH5s8Juq3K6iPazaTVal_u0_cSk",
    authDomain: "mymoney-a67a0.firebaseapp.com",
    projectId: "mymoney-a67a0",
    storageBucket: "mymoney-a67a0.appspot.com",
    messagingSenderId: "1029185450227",
    appId: "1:1029185450227:web:4297a301f7f8802ab18786"
  };

//   init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }