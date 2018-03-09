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

const db = firebase.database();

const storage = firebase.storage();

const auth = firebase.auth();

const posts_ref = db.ref(`posts`);

export { firebase, storage, auth, db, posts_ref };
