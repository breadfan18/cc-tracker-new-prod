import { handleResponse, handleError } from "./apiUtils";
import { db } from "../tools/firebase";
import { onValue, ref, set } from "firebase/database";
import { slugify } from "../helpers";
const baseUrl = process.env.API_URL + "/loyaltyData/";

export function getLoyaltyData() {
  let loyaltyData = {};
  onValue(ref(db), (snapshot) => {
    const data = snapshot.val();

    console.log(data);
    if (data !== null) {
      loyaltyData = data.loyaltyData;
    }
  });

  // console.log("loyaltyData", loyaltyData);
  return loyaltyData;
}
// export function getLoyaltyData() {
//   return fetch(baseUrl).then(handleResponse).catch(handleError);
// }

export function createLoyaltyData(loyaltyAcc) {
  // set(ref(db, "loyaltyData/" + loyaltyAcc.id), {
  //   ...loyaltyAcc,
  // });
  const uuid = slugify(loyaltyAcc.program.name + loyaltyAcc.userId);
  console.log();
  set(ref(db, `loyaltyData/${uuid}`), {
    ...loyaltyAcc,
    uuid,
  });
}
// export function createLoyaltyData(loyalty) {
//   return fetch(baseUrl + (loyalty.id || ""), {
//     method: loyalty.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(loyalty),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function deleteLoyaltyAcc(loyaltyAcc) {
  return fetch(baseUrl + loyaltyAcc.id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
