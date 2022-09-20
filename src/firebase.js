import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0pNqht8hJfRZok7OtVeo_e7KqClZa7No",
  authDomain: "wedppy-dc873.firebaseapp.com",
  databaseURL: "https://wedppy-dc873-default-rtdb.firebaseio.com",
  projectId: "wedppy-dc873",
  storageBucket: "wedppy-dc873.appspot.com",
  messagingSenderId: "154550005722",
  appId: "1:154550005722:web:6afdc1479d74ecdc32dae3",
  measurementId: "G-Q3W1JQJ930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth()
export { auth, db };
