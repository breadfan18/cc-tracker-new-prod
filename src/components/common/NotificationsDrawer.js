import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiDelete } from "react-icons/ti";
import { FaBell } from "react-icons/fa";
import { APP_COLOR_BLUE, DELETE_COLOR_RED } from "../../constants";
import { useDispatch } from "react-redux";
import { deleteNotificationFromFirebase } from "../../redux/actions/notificationsActions";

function Notifications({ notifications, notificationsRef, firebaseUid }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className="userMenuOptions" onClick={handleShow}>
        <span
          class="userMenuNotificationsBadge"
          style={{
            marginRight: "10px",
            backgroundColor:
              notifications?.length === 0 ? APP_COLOR_BLUE : DELETE_COLOR_RED,
          }}
        >
          {notifications.length}
        </span>
        Notifications
      </li>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ padding: "10px" }}
        className="notificationsDrawer"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: APP_COLOR_BLUE }}>
            Notifications
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div ref={notificationsRef}>
            {notifications?.length === 0 ? (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "1.2rem" }}>You're all caught up!</div>
                <br />

                <FaBell className="bell-icon ringing" />
              </section>
            ) : (
              notifications.map((notification, index) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={index}
                  >
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
                        dispatch(
                          deleteNotificationFromFirebase(
                            notification,
                            firebaseUid
                          )
                        );
                      }}
                    />
                  </div>
                  <hr style={{ color: APP_COLOR_BLUE }} />
                </>
              ))
            )}
            {}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Notifications;
