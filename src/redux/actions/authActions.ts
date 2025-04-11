import { logout } from "../../tools/firebase";
import { USER_LOGOUT_SUCCESS } from "./actionTypes";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Auth } from "firebase/auth";

function userLogoutSuccess(): ActionTypes {
  return { type: USER_LOGOUT_SUCCESS };
}
export function userLogout(auth: Auth): ActionThunkReturn {
  return (dispatch) => {
    logout(auth);
    dispatch(userLogoutSuccess());
  };
}
