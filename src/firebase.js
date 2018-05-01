import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDF2q_mcbCy2zbyZvfLKBv4RjwEs1l55y0",
  authDomain: "example-app-55713.firebaseapp.com",
  databaseURL: "https://example-app-55713.firebaseio.com",
  projectId: "example-app-55713",
  storageBucket: "example-app-55713.appspot.com",
  messagingSenderId: "288376598665"
};
firebase.initializeApp(config);

export default firebase;
