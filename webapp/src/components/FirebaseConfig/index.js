import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database"

function StartFirebase(){
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

    const firebaseConfig = {

    apiKey: "AIzaSyBDsVO7xp5JQW2PAw4IqbyzJw5z5h_zmpM",
    authDomain: "speech-to-text-3ed5b.firebaseapp.com",
    databaseURL: "https://speech-to-text-3ed5b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "speech-to-text-3ed5b",
    storageBucket: "speech-to-text-3ed5b.appspot.com",
    messagingSenderId: "894707966427",
    appId: "1:894707966427:web:04cb417dc2ee3be830c7fe"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return getDatabase(app);
}

export default StartFirebase;
