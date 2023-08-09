import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBUS_jXqW-xQdBzeiiAGmYC-tl1Byzfhw8",
  authDomain: "cc-tracker-new.firebaseapp.com",
  databaseURL: "https://cc-tracker-new-default-rtdb.firebaseio.com/",
  projectId: "cc-tracker-new",
  storageBucket: "cc-tracker-new.appspot.com",
  messagingSenderId: "278786623631",
  appId: "1:278786623631:web:918ade05f2772ea64248fa",
  measurementId: "G-34RE8T9GE9",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// DATABASE FUNCTIONS
export function getFireBaseData(endpoint, dispatch, dispatchFunc) {
  onValue(ref(db, `${endpoint}/`), (snap) => {
    const allData = [];
    snap.forEach((data) => {
      const childData = data.val();
      allData.push(childData);
    });
    dispatch(dispatchFunc(allData));
  });
}

export function writeToFirebase(endpoint, data, id) {
  set(ref(db, `${endpoint}/${id}`), {
    ...data,
    id,
  });
}

export function deleteFromFirebase(endpoint, id) {
  remove(ref(db, `${endpoint}/${id}`));
}

// AUTH FUNCTIONS
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const login = async (auth) => {
  await signInWithPopup(auth, provider);
};

const logout = (auth) => auth.signOut();

export { login, logout, auth };
