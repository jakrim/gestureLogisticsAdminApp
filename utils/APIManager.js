import firebase from 'firebase';
import { Platform } from 'react-native';

/**
 * @returns {String} The user's id token
 */
const token = async () => {
  const id = await firebase.auth().currentUser.getIdToken();
  console.log(id);
  return id;
};
/**
 * @returns {String} A String that contains basic url params
 */
const basicUrl = async () => {
  const { uid } = firebase.auth().currentUser;
  //console.log(uid, await token());
  return 'os=' + Platform.OS + '&uid=' + uid + '&token=' + (await token());
};

// const URL = __DEV__ ? 'https://us-central1-gesture-dev.cloudfunctions.net' : 'https://us-central1-yourgestureapp.cloudfunctions.net'
const URL = 'https://us-central1-yourgestureapp.cloudfunctions.net/';

/**
 * Get user's infomation
 *
 * @param {(json: Object?, error?) => {}} callBack functions to handle callBack
 */
export const getUserInfo = async (callBack) => {
  let url = `${URL}/user?` + (await basicUrl());

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('GET USERINFO ===>');
      console.log('JSON: ' + JSON.stringify(responseJson));
      callBack(responseJson, null);
    })
    .catch((error) => {
      console.log('GET USERINFO ===>');
      console.log('ERROR: ' + error);
      callBack(null, error);
    });
};
