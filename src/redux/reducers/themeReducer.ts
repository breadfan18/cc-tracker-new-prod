import { ThemeActionTypes } from "../../types/redux";
import { SET_THEME_DARK, SET_THEME_LIGHT } from "../actions/actionTypes";
import initialState from "./initialState";

export default function colorTheme(
  state: string = initialState.theme,
  action: ThemeActionTypes
): string {
  if (action.type === SET_THEME_DARK) return "dark";
  else if (action.type === SET_THEME_LIGHT) return "light";

  return state;
}
