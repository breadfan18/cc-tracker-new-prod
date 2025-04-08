import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { SET_THEME_DARK, SET_THEME_LIGHT } from "./actionTypes";

function setDarkThemeSuccess(theme: string): ActionTypes {
  if (theme === "dark") {
    return { type: SET_THEME_DARK, payload: theme };
  } else {
    return { type: SET_THEME_LIGHT, payload: theme };
  }
}
export function changeReduxTheme(theme: string): ActionThunkReturn {
  return (dispatch) => {
    dispatch(setDarkThemeSuccess(theme));
  };
}
