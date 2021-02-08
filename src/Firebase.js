import firebase from 'firebase';




const firebaseConfig = {
    apiKey: "AIzaSyDua8V_tvlPoBGagJw74ubsppEXkDMpyC0",
    authDomain: "cookiemedia.firebaseapp.com",
    projectId: "cookiemedia",
    storageBucket: "cookiemedia.appspot.com",
    messagingSenderId: "808638629168",
    appId: "1:808638629168:web:11e0a8d3dade447036f4f5"
  };



  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export {db, auth, provider, storage};