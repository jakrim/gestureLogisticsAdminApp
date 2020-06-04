import firebase from 'firebase/app';
import 'firebase/auth';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBtSK8bShTP8DH63ViI6zgkKnKoxD-vCSE',
  authDomain: 'gesture-dev.firebaseapp.com',
  databaseURL: 'https://gesture-dev.firebaseio.com',
  projectId: 'gesture-dev',
  storageBucket: 'gesture-dev.appspot.com',
  messagingSenderId: '4334941903',
  appId: '1:4334941903:web:f85f8d95e80905595d69ba',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const token = async () => {
  const id = await firebase.auth().currentUser.getIdToken();
  console.log(id);
  return id;
};

export const basicUrl = async () => {
  const { uid } = firebase.auth().currentUser;
  //console.log(uid, await token());
  return 'os=' + Platform.OS + '&uid=' + uid + '&token=' + (await token());
};

export const URL = 'https://us-central1-gesture-dev.cloudfunctions.net';
