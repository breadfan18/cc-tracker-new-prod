import React from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { GoClockFill } from "react-icons/go";
import { deleteNotificationFromFirebase } from "../../../redux/actions/notificationsActions";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { APP_COLOR_BLUE } from "../../../constants";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function Notification({
  notification,
  index,
  firebaseUid,
  setShow,
}) {
  const dispatch = useDispatch();
  const { message, dateSent, notificationType, notificationId } = notification;

  const cardId =
    notificationType === "loyalty" ? null : notificationId.split("_")[2];

  const headerText =
    notificationType === "annualFee"
      ? "Annual Fee Alert"
      : notificationType === "loyalty"
      ? "Loyalty Points Expiring"
      : "Bonus Spend Deadline";
  return (
    <div className="notificationDiv" key={index}>
      <div className="notificationHeader">
        {notificationType === "annualFee" ? (
          <RiMoneyDollarCircleFill className="notificationIcon" />
        ) : notificationType === "spendBy" ? (
          <GoClockFill className="notificationIcon spendBy" />
        ) : (
          <PiAirplaneTiltFill className="notificationIcon loyalty" />
        )}
        <h6 style={{ color: APP_COLOR_BLUE }}>{headerText}</h6>
      </div>
      <div className="notificationBody">
        <TiDelete
          className="notificationDelete"
          onClick={() => {
            dispatch(deleteNotificationFromFirebase(notification, firebaseUid));
          }}
        />
        <p>{message}</p>
        <br />
        <section className="notificationFooter">
          <p className="notificationDate">{dateSent}</p>
          {notificationType !== "loyalty" ? (
            <Link
              className="notificationCardButton"
              to={`/card/${cardId}`}
              onClick={() => setShow(false)}
            >
              Go to Card
            </Link>
          ) : (
            <Link
              className="notificationCardButton"
              to={`/loyalty-accounts/`}
              onClick={() => setShow(false)}
            >
              Loyalty Page
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
