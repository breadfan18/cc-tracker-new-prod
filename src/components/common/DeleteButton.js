import React from "react";
import { Button } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import PropTypes from "prop-types";

export function DeleteButton({ onClick, disableBtn, showAsRectangle }) {
  return (
    <Button
      variant="danger"
      onClick={onClick}
      className={!showAsRectangle ? "rounded-circle" : ""}
      disabled={disableBtn}
    >
      <BsTrash3 />
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
