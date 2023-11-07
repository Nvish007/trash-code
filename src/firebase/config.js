import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBsk6DAHlgxt4hwyY2tLArVsZs0mQ_tqI',
  //authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'nirav-test-b6f62.firebaseio.com',
  projectId: 'nirav-test-b6f62',
  storageBucket: 'nirav-test-b6f62.appspot.com',
  //messagingSenderId: '12345-insert-yourse',
  appId: '1:1021226895547:android:764d2cb7da3280eb',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
