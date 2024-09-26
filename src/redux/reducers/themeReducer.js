import { SET_THEME_DARK, SET_THEME_LIGHT } from "../actions/actionTypes";
import initialState from "./initialState";

export default function colorTheme(state = initialState.theme, action) {
  if (action.type === SET_THEME_DARK) return "dark";
  else if (action.type === SET_THEME_LIGHT) return "light";

  return state;
}
