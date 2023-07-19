import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://cc-tracker-new-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

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
