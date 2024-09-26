import { SET_THEME_DARK, SET_THEME_LIGHT } from "./actionTypes";

function setDarkThemeSuccess(theme) {
  if (theme === "dark") {
    return { type: SET_THEME_DARK, theme };
  } else if (theme === "light") {
    return { type: SET_THEME_LIGHT, theme };
  }
}
export function changeReduxTheme(theme) {
  return (dispatch) => {
    dispatch(setDarkThemeSuccess(theme));
  };
}
