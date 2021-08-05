import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD-jR1WZ7vWEnekTzK9GtwXkR2WtyNjKqw",
    authDomain: "money-app-73666.firebaseapp.com",
    projectId: "money-app-73666",
    storageBucket: "money-app-73666.appspot.com",
    messagingSenderId: "865704942184",
    appId: "1:865704942184:web:167dadee4e7c4bd732f9dd",
    measurementId: "G-SM7ST90KQ0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;