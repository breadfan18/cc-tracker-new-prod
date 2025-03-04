import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Burger from "../common/Burger";
import { APP_COLOR_BLUE, HEADER_CARD_LOGO } from "../../constants";
import UserProfileSection from "./UserProfileSection";
import { UserInfo } from "firebase/auth";

const navData = [
  {
    route: "/",
    text: "Home",
  },
  {
    route: "/cards",
    text: "Cards",
  },
  {
    route: "/524",
    text: "5/24",
  },
  {
    route: "/loyalty-accounts",
    text: "Loyalty",
  },
  {
    route: "/card-holders",
    text: "Card Holders",
  },
  {
    route: "/referrals",
    text: "Referrals",
  },
];

const Header = ({ user, isMobile }: { user: UserInfo; isMobile: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeStyle = {
    color: APP_COLOR_BLUE,
    borderBottom: `4px solid ${APP_COLOR_BLUE}`,
  };

  const activeStyleMobile = {
    color: APP_COLOR_BLUE,
    backgroundColor: "white",
    borderRadius: "5px",
  };
  let navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navMenuHandler = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", navMenuHandler);

    return () => document.removeEventListener("mousedown", navMenuHandler);
  });

  return isMobile ? (
    <header className="smallNavContainer">
      <nav id="smallNavTopHeader">
        <Burger open={menuOpen} setOpen={setMenuOpen} />
        <UserProfileSection user={user} />
      </nav>
      <nav className={`navSmallContent ${menuOpen ? "open" : ""}`} ref={navRef}>
        {navData.map((nav, index) => (
          <NavLink
            key={index}
            exact={nav.route === "/"}
            to={nav.route}
            activeStyle={activeStyleMobile}
            onClick={() => setMenuOpen(false)}
          >
            {nav.text}
          </NavLink>
        ))}
      </nav>
    </header>
  ) : (
    <header className="navContainer">
      <section className="headerSectionLeft">
        <img src={HEADER_CARD_LOGO} alt="" />
      </section>
      <section className="headerSectionRight">
        <nav className="navFull">
          {navData.map((nav, index) => (
            <NavLink
              key={index}
              exact={nav.route === "/"}
              to={nav.route}
              activeStyle={activeStyle}
            >
              {nav.text}
            </NavLink>
          ))}
        </nav>
        <UserProfileSection user={user} />
      </section>
    </header>
  );
};

export default Header;
