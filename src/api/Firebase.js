import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCtlai4axJgY4fR4FlcvpXPRPPvZyrcGe0",
    authDomain: "bookingappticket.firebaseapp.com",
    projectId: "bookingappticket",
    storageBucket: "bookingappticket.appspot.com",
    messagingSenderId: "882542642128",
    appId: "1:882542642128:web:967ba0395b4ec032ac6fd5"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;