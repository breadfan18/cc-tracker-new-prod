import React from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { DELETE_COLOR_RED, EDIT_COLOR_GREEN } from "../../constants";
import { deleteNotificationFromFirebase } from "../../redux/actions/notificationsActions";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";

export default function Notification({ notification, index, firebaseUid }) {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      key={index}
    >
      <RiMoneyDollarCircleFill
        style={{
          fontSize: "3rem",
          marginRight: "10px",
          color: EDIT_COLOR_GREEN,
        }}
      />
      <p style={{ fontSize: "15px", maxWidth: "18rem" }}>
        {notification.message}
      </p>
      <TiDelete
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          color: DELETE_COLOR_RED,
        }}
        onClick={() => {
          dispatch(deleteNotificationFromFirebase(notification, firebaseUid));
        }}
      />
    </div>
  );
}
