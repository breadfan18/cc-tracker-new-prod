import { PiAirplaneTiltFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { deleteNotificationFromFirebase } from "../../../redux/actions/notificationsActions";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import {
  APP_COLOR_BLUE,
  NOTIFICATIONS_AF_DATA_TYPE,
  NOTIFICATIONS_LOYALTY_DATA_TYPE,
} from "../../../constants";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { formatDate } from "../../../helpers";

export default function Notification({
  notification,
  index,
  firebaseUid,
  setShow,
}) {
  const dispatch = useDispatch();
  const { sidebarNotification, dateSent, notificationType, notificationId } =
    notification;

  const cardId =
    notificationType === NOTIFICATIONS_LOYALTY_DATA_TYPE
      ? null
      : notificationId.split("_")[2];

  const headerText =
    notificationType === NOTIFICATIONS_AF_DATA_TYPE
      ? "Annual Fee Approaching.."
      : notificationType === NOTIFICATIONS_LOYALTY_DATA_TYPE
      ? "Loyalty Points Expiring.."
      : "Bonus Deadline Approaching..";
  return (
    <div className="notificationDiv" key={index}>
      <div className="notificationHeader">
        {notificationType === "annualFee" ? (
          <TbAlertOctagonFilled className="notificationIcon" />
        ) : notificationType === "spendBy" ? (
          <BsFillBellFill className="notificationIcon spendBy" />
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
        <p>{sidebarNotification}</p>
        <br />
        <section className="notificationFooter">
          <p className="notificationDate">{formatDate(dateSent)}</p>
          {notificationType !== NOTIFICATIONS_LOYALTY_DATA_TYPE ? (
            <Link
              className="notificationCardButton"
              to={`/card/${cardId}`}
              onClick={() => setShow(false)}
            >
              Go to Card <FaArrowRight style={{ marginLeft: "5px" }} />
            </Link>
          ) : (
            <Link
              className="notificationCardButton"
              to={`/loyalty-accounts/`}
              onClick={() => setShow(false)}
            >
              Loyalty Page <FaArrowRight style={{ marginLeft: "5px" }} />
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
