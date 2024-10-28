import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  MdSpaceDashboard,
  MdAdminPanelSettings,
  MdLogout,
} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { APP_COLOR_BLUE, APP_COLOR_LIGHT_BLACK } from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";
import ThemeToggle from "./ThemeToggle";
import { loadNotificationsFromFirebase } from "../../redux/actions/notificationsActions";

function UserProfileSection({ user, userLogout }) {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const showMenuRef = useRef(null);
  const { isMobile } = useWindhowWidth();
  const theme = useSelector((selector) => selector.theme);

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  const hideShowMenuOnDocumentClick = (event) => {
    if (!showMenuRef.current?.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const toggleShowMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    document.addEventListener("mousedown", hideShowMenuOnDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", hideShowMenuOnDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  function handleSignOut() {
    userLogout(auth);
    localStorage.removeItem("selectedUser");
    history.push("/signin");
  }

  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  console.log(notifications);

  useEffect(() => {
    if (notifications.length === 0) {
      dispatch(loadNotificationsFromFirebase(user.uid));
    }
  }, [notifications]);

  return (
    <section
      id="userSection"
      style={{
        boxShadow: !isMobile && `-4px 0 8px -6px ${APP_COLOR_LIGHT_BLACK}`,
      }}
    >
      <div class="user-img-container">
        <img
          // src={user.photoURL}
          src="https://i.imgur.com/JFgA7EB.png"
          alt=""
          style={{
            borderRadius: "50%",
            height: "2.8rem",
            marginRight: "8px",
          }}
          title={user.displayName}
        />
        <span class="notification-dot"></span>
      </div>

      <div style={{}}></div>
      <article>
        <p
          style={{
            fontSize: "12px",
            color: isMobile ? "white" : "gray",
            marginBottom: "-5px",
          }}
        >
          Basic Plan
        </p>
        <h5 style={{ color: isMobile ? "white" : APP_COLOR_BLUE }}>
          {user.displayName}
        </h5>
      </article>
      {showMenu ? (
        <FaAngleUp
          style={{
            marginLeft: "10px",
            fontSize: "1.3rem",
            cursor: "pointer",
            color: isMobile || theme === "dark" ? "white" : "black",
          }}
          onClick={toggleShowMenu}
        />
      ) : (
        <FaAngleDown
          style={{
            marginLeft: "10px",
            fontSize: "1.3rem",
            cursor: "pointer",
            color: isMobile || theme === "dark" ? "white" : "black",
          }}
          onClick={toggleShowMenu}
        />
      )}
      {showMenu && (
        <div
          className="userProfileMenu"
          ref={showMenuRef}
          style={{ backgroundColor: theme === "dark" && "black" }}
        >
          <div className="themeTogglePlacement">
            <ThemeToggle displayToggle={true} />
          </div>
          <ul style={{ listStyle: "none", padding: "0", margin: 0 }}>
            <li className="userMenuOptions disabledMenuOption">
              IoMdNotifications
              <IoMdNotifications
                style={{ marginRight: "10px", color: APP_COLOR_BLUE }}
              />
              Notifications
            </li>
            <li className="userMenuOptions disabledMenuOption">
              <RiLockPasswordFill
                style={{ marginRight: "10px", color: APP_COLOR_BLUE }}
              />
              Security
            </li>
            <li className="userMenuOptions disabledMenuOption">
              <MdAdminPanelSettings
                style={{ marginRight: "10px", color: APP_COLOR_BLUE }}
              />
              Admin Portal
            </li>
            <li
              className="userMenuOptions"
              style={{
                color: theme === "light" ? "black" : "white",
                cursor: "pointer",
              }}
              onClick={handleSignOut}
            >
              <MdLogout
                style={{ marginRight: "10px", color: APP_COLOR_BLUE }}
              />
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

const mapDispatchToProps = {
  userLogout,
};

export default connect(null, mapDispatchToProps)(UserProfileSection);

/* <div class="notification-icon">
        <span class="notification-badge">{notifications.length}</span>
      </div> */
/* {notifications.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))} */
