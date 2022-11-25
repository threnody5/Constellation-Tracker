/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyADmFx9SEQx0v_fJGvaX_ruMhGJKJk0ySs',
  authDomain: 'info-3173-final-project.firebaseapp.com',
  databaseURL: 'https://info-3173-final-project-default-rtdb.firebaseio.com',
  projectId: 'info-3173-final-project',
  storageBucket: 'info-3173-final-project.appspot.com',
  messagingSenderId: '303411075270',
  appId: '1:303411075270:web:155c21236a88f5a01b9fc7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const database = getDatabase(app);
