import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB7cO7cBbZr4gy5Whaurud8tA5MN-zZfeY',
  authDomain: 'yerevan-coder.firebaseapp.com',
  databaseURL: 'https://yerevan-coder.firebaseio.com',
  projectId: 'yerevan-coder',
  storageBucket: 'yerevan-coder.appspot.com',
  messagingSenderId: '404306745515',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const root_storage = firebase.storage().ref();

const auth = firebase.auth();

const user_profile_storage = root_storage.child('users');

const job_board_storage = root_storage.child('job-board');

export { root_storage, auth, user_profile_storage, job_board_storage };
