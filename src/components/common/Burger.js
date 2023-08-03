import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

function Burger({ open, setOpen }) {
  return (
    <button id="burger" onClick={() => setOpen(!open)}>
      {open ? (
        <MdClose style={{ color: "white", fontSize: "2rem" }} />
      ) : (
        <GiHamburgerMenu style={{ color: "white", fontSize: "2rem" }} />
      )}
    </button>
  );
}

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Burger;
