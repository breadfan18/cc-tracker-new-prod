import { beginApiCall } from "./apiStatusActions";
import {
  LOAD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "./actionTypes";
import { deleteFromFirebase, getFireBaseData } from "../../tools/firebase";

function loadNotificationsSuccess(notifications) {
  return { type: LOAD_NOTIFICATIONS_SUCCESS, notifications };
}

function deleteNotificationSuccess(notification) {
  return { type: DELETE_NOTIFICATION_SUCCESS, notification };
}

export function loadNotificationsFromFirebase(firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData(
      "notifications",
      dispatch,
      loadNotificationsSuccess,
      firebaseUid
    );
  };
}

export function deleteNotificationFromFirebase(notification, firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    deleteFromFirebase(
      "notifications",
      notification.notificationId,
      firebaseUid
    );
    dispatch(deleteNotificationSuccess(notification));
  };
}
