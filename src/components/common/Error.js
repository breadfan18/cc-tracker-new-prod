import React from "react";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_EPIC_RED,
  DELETE_COLOR_RED,
} from "../../constants/constants";

export default function Error({ errorMessage }) {
  return (
    <div
      style={{
        backgroundColor: APP_COLOR_BLACK_OPACITY,
        color: DELETE_COLOR_RED,
        border: `2px solid ${APP_COLOR_EPIC_RED}`,
        padding: "5px 10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      {errorMessage}
    </div>
  );
}
