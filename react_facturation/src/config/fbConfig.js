import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyB3W-m_VMQvCWyUqHjxhhnMlDPBZ5UVEZo',
  authDomain: 'react-facturation-projec-4553e.firebaseapp.com',
  databaseURL: 'https://react-facturation-projec-4553e.firebaseio.com',
  projectId: 'react-facturation-projec-4553e',
  storageBucket: 'react-facturation-projec-4553e.appspot.com',
  messagingSenderId: '267747520300',
  appId: '1:267747520300:web:8cb92b96833e141d'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();
//firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
