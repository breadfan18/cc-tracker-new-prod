// api status removed; using per-slice loading for initial data
import {
  LOAD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  subscribeToFirebaseData,
} from "../../tools/firebase";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Notification } from "../../types/cards-types";

function loadNotificationsSuccess(notifications: Notification[]): ActionTypes {
  return { type: LOAD_NOTIFICATIONS_SUCCESS, payload: notifications };
}

function deleteNotificationSuccess(notification: Notification): ActionTypes {
  return { type: DELETE_NOTIFICATION_SUCCESS, payload: notification };
}

export function loadNotificationsFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    subscribeToFirebaseData<Notification>(
      "notifications",
      dispatch,
      loadNotificationsSuccess,
      firebaseUid,
      undefined
    );
  };
}

export function deleteNotificationFromFirebase(
  notification: Notification,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase(
      "notifications",
      notification.notificationId,
      firebaseUid
    );
    dispatch(deleteNotificationSuccess(notification));
  };
}

export const deleteCardNotificationsOnCardClosure = (
  allNotifications: Notification[],
  cardId: string,
  firebaseUid: string
): ActionThunkReturn => {
  return (dispatch) => {
    const cardNotifications = allNotifications.filter(
      (notification) => notification.cardId === cardId
    );

    cardNotifications.forEach((notification) =>
      dispatch(deleteNotificationFromFirebase(notification, firebaseUid))
    );
  };
};

export const deleteSpendByNotificationWhenBonusEarned = (
  allNotifications: Notification[],
  cardId: string,
  firebaseUid: string
): ActionThunkReturn => {
  return (dispatch) => {
    const cardSpendByNotfications = allNotifications.filter(
      (notification) =>
        notification.cardId === cardId &&
        notification.notificationType === "spendBy"
    );

    cardSpendByNotfications.forEach((notification) =>
      dispatch(deleteNotificationFromFirebase(notification, firebaseUid))
    );
  };
};

export function deleteLoyaltyNotificationOnLoyaltyClosure(
  allNotifications: Notification[],
  loyaltyId: string,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    const loyaltyNotifications = allNotifications.filter(
      (notification) => notification.loyaltyId === loyaltyId
    );

    loyaltyNotifications.forEach((notification) =>
      dispatch(deleteNotificationFromFirebase(notification, firebaseUid))
    );
  };
}
