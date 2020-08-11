import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAVg3XCKYc9MaQ9bzBzR0RmDa1c3QK9IwU",
  authDomain: "golden-project-c63e3.firebaseapp.com",
  databaseURL: "https://golden-project-c63e3.firebaseio.com",
  projectId: "golden-project-c63e3",
  storageBucket: "golden-project-c63e3.appspot.com",
  messagingSenderId: "171220730686",
  appId: "1:171220730686:web:f5555f6946aacc3168226f"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
