import { ActionTypes } from "../../types/redux";
import { API_CALL_ERROR, BEGIN_API_CALL } from "./actionTypes";

export function beginApiCall(): ActionTypes {
  return { type: BEGIN_API_CALL };
}

export function apiCallError(): ActionTypes {
  return { type: API_CALL_ERROR };
}
