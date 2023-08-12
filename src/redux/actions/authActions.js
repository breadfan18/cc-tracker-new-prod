import { logout } from "../../tools/firebase";
import { USER_LOGOUT_SUCCESS } from "./actionTypes";

function userLogoutSuccess() {
  return { type: USER_LOGOUT_SUCCESS };
}
export function userLogout(auth) {
  return (dispatch) => {
    logout(auth);
    dispatch(userLogoutSuccess());
  };
}
