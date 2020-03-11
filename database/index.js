import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBtSK8bShTP8DH63ViI6zgkKnKoxD-vCSE',
  authDomain: 'gesture-dev.firebaseapp.com',
  databaseURL: 'https://gesture-dev.firebaseio.com',
  projectId: 'gesture-dev',
  storageBucket: 'gesture-dev.appspot.com',
  messagingSenderId: '4334941903',
  appId: '1:4334941903:web:f85f8d95e80905595d69ba'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

console.log('HERE"S FIREBASE', firebase);
