import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { APP_COLOR_BLUE, HEADER_CARD_LOGO } from "../../constants";
import UserProfileSection from "./UserProfileSection";

const Header = ({ user, isMobile }) => {
  const [open, setOpen] = useState(false);
  const activeStyle = {
    color: APP_COLOR_BLUE,
    borderBottom: `4px solid ${APP_COLOR_BLUE}`,
  };

  const activeStyleMobile = {
    color: APP_COLOR_BLUE,
    backgroundColor: "white",
    borderRadius: "5px",
  };
  let navRef = useRef();

  useEffect(() => {
    const navMenuHandler = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", navMenuHandler);

    return () => document.removeEventListener("mousedown", navMenuHandler);
  });

  return isMobile ? (
    <header className="smallNavContainer">
      <nav id="smallNavTopHeader">
        <Burger open={open} setOpen={setOpen} />
        <UserProfileSection user={user} />
      </nav>
      {open && (
        <nav className="navSmallContent" ref={navRef}>
          <NavLink
            to="/"
            activeStyle={activeStyleMobile}
            exact
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cards"
            activeStyle={activeStyleMobile}
            onClick={() => setOpen(false)}
          >
            Cards
          </NavLink>
          <NavLink
            to="/524"
            activeStyle={activeStyleMobile}
            onClick={() => setOpen(false)}
          >
            5/24
          </NavLink>
          <NavLink
            to="/loyalty-accounts"
            activeStyle={activeStyleMobile}
            onClick={() => setOpen(false)}
          >
            Loyalty
          </NavLink>
          <NavLink
            to="/card-holders"
            activeStyle={activeStyleMobile}
            onClick={() => setOpen(false)}
          >
            Card Holders
          </NavLink>
          <NavLink
            to="/referrals"
            activeStyle={activeStyleMobile}
            onClick={() => setOpen(false)}
          >
            Referrals
          </NavLink>
        </nav>
      )}
    </header>
  ) : (
    <header className="navContainer">
      <section className="headerSectionLeft">
        <img src={HEADER_CARD_LOGO} alt="" />
      </section>
      <section className="headerSectionRight">
        <nav className="navFull">
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
          <NavLink to="/cards" activeStyle={activeStyle}>
            Cards
          </NavLink>
          <NavLink to="/524" activeStyle={activeStyle}>
            5/24
          </NavLink>
          <NavLink to="/loyalty-accounts" activeStyle={activeStyle}>
            Loyalty
          </NavLink>
          <NavLink to="/card-holders" activeStyle={activeStyle}>
            Card Holders
          </NavLink>
          <NavLink to="/referrals" activeStyle={activeStyle}>
            Referrals
          </NavLink>
        </nav>
        <UserProfileSection user={user} />
      </section>
    </header>
  );
};

export default Header;
