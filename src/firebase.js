
import firebase from "firebase";
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCgLd1bm7GEQgpF4hru_CzlX8-26W2fwoc",
  authDomain: "kaoutar-burger.firebaseapp.com",
  projectId: "kaoutar-burger",
  storageBucket: "kaoutar-burger.appspot.com",
  messagingSenderId: "134049853103",
  appId: "1:134049853103:web:6b3d352ebf907304112e5a",
  measurementId: "G-5GNRW7G3B0"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase ;
