'use strict'

const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDGlFHqFq3-rN33C7NlpPj5o7UqLxPTDAY",
    authDomain: "silentatlantis-a038a.firebaseapp.com",
    databaseURL: "https://silentatlantis-a038a.firebaseio.com",
    projectId: "silentatlantis-a038a",
    storageBucket: "silentatlantis-a038a.appspot.com",
    messagingSenderId: "505227145852",
    appId: "1:505227145852:web:87488efe1a42144e444ff9"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

module.exports = fire