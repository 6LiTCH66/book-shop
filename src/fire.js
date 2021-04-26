import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBWxbm3DPr5HqxNRZERWEEJoWHgtwEUMS0",
    authDomain: "fir-react-d5690.firebaseapp.com",
    projectId: "fir-react-d5690",
    storageBucket: "fir-react-d5690.appspot.com",
    messagingSenderId: "230751563400",
    appId: "1:230751563400:web:a0b5d012993c6b2378b93d",
    measurementId: "G-E80BQRMYL8"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;