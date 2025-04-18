import { useEffect, useRef, useState } from "react";
import { auth } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { APP_COLOR_BLUE, APP_COLOR_LIGHT_BLACK } from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";
import ThemeToggle from "./ThemeToggle";
import { loadNotificationsFromFirebase } from "../../redux/actions/notificationsActions";
import NotificationsDrawer from "../common/Notifications/NotificationsDrawer";
import { MainReduxState } from "../../types/redux";
import { UserInfo } from "firebase/auth";

function UserProfileSection({ user }: { user: UserInfo }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { isMobile } = useWindhowWidth();
  const theme = useSelector((state: MainReduxState) => state.theme);
  const notifications = useSelector(
    (state: MainReduxState) => state.notifications
  );
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const showMenuRef = useRef<HTMLDivElement>(null);
  const userSectionRef = useRef<HTMLElement>(null);
  const notificationsDrawerRef = useRef<HTMLDivElement>(null);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (notifications.length === 0 && !notificationsLoaded) {
      dispatch(loadNotificationsFromFirebase(user.uid));
      setNotificationsLoaded(true);
    }
  }, [dispatch, notifications.length, notificationsLoaded, user.uid]);

  const hideShowMenuOnDocumentClick = (event: MouseEvent) => {
    const isClickInsideMenu = showMenuRef.current?.contains(
      event.target as Node
    );
    const isClickOnUserSection = userSectionRef.current?.contains(
      event.target as Node
    );
    const isClickOnNotificationOption =
      notificationsDrawerRef.current?.contains(event.target as Node);

    if (
      !isClickInsideMenu &&
      !isClickOnUserSection &&
      !isClickOnNotificationOption
    ) {
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

  useEffect(() => {
    // this useEffect listens for route changes and closes the user menu if we route to another page.
    const unlisten = history.listen(() => setShowMenu(false));
    return () => unlisten();
  }, [history]);

  function handleSignOut() {
    dispatch(userLogout(auth));
    localStorage.removeItem("selectedUser");
    history.push("/signin");
  }

  return (
    <div id="userSectionContainer">
      <section
        id="userSection"
        ref={userSectionRef}
        style={{
          boxShadow: !isMobile
            ? `-4px 0 8px -6px ${APP_COLOR_LIGHT_BLACK}`
            : "",
        }}
        onClick={toggleShowMenu}
      >
        <div className="user-img-container">
          <img
            src={user.photoURL || ""}
            // src={CARDHOLDER_STOCK_IMG}
            alt=""
            style={{
              borderRadius: "50%",
              height: "2.8rem",
              marginRight: "8px",
            }}
            title={user.displayName || ""}
          />
          {notifications.length > 0 && <span className="notification-dot" />}
        </div>
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
          />
        ) : (
          <FaAngleDown
            style={{
              marginLeft: "10px",
              fontSize: "1.3rem",
              cursor: "pointer",
              color: isMobile || theme === "dark" ? "white" : "black",
            }}
          />
        )}
      </section>
      {showMenu && (
        <div
          className="userProfileMenu"
          ref={showMenuRef}
          style={{ backgroundColor: theme === "dark" ? "black" : "" }}
        >
          <div className="themeTogglePlacement">
            <ThemeToggle displayToggle={true} />
          </div>
          <ul style={{ listStyle: "none", padding: "0", margin: 0 }}>
            <NotificationsDrawer
              notifications={notifications}
              notificationsRef={notificationsDrawerRef}
              firebaseUid={user.uid}
            />
            <li className="userMenuOptions disabledMenuOption">
              <RiLockPasswordFill />
              Security
            </li>
            <li className="userMenuOptions disabledMenuOption">
              <RiAdminFill />
              Admin Portal
            </li>
            <li className="userMenuOptions" onClick={handleSignOut}>
              <MdLogout />
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfileSection;
