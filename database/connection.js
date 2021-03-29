var firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyCVv5t6i1D5OTF89GKBX9rBStXU6-2IQh8",
    authDomain: "customer-details-2dc39.firebaseapp.com",
    databaseURL: "https://customer-details-2dc39-default-rtdb.firebaseio.com",
    projectId: "customer-details-2dc39",
    storageBucket: "customer-details-2dc39.appspot.com",
    messagingSenderId: "893885069860",
    appId: "1:893885069860:web:59a072d3781462fa7576b1",
    measurementId: "G-E58LW0B7D4"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

var database = firebase.database()

module.exports = database