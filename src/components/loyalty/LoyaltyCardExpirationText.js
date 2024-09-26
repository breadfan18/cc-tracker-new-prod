import React from "react";
import PropTypes from "prop-types";
import { DELETE_COLOR_RED } from "../../constants";

function LoyaltyCardExpirationText({
  expirationDate,
  daysForExpiration,
  theme,
}) {
  return (
    <p
      className="mb-0 cardBodyText"
      style={{ display: "flex", alignItems: "center" }}
    >
      <b>Expiration</b>
      {": "}
      <small
        className="cardTextValue"
        style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
      >
        {expirationDate}{" "}
        {daysForExpiration && (
          <p
            style={{
              margin: "2.5px 0 0 3px",
              fontSize: "11px",
              color: daysForExpiration <= 90 ? DELETE_COLOR_RED : "",
            }}
          >{`(Rewards expire in ${daysForExpiration} days)`}</p>
        )}
      </small>
    </p>
  );
}

LoyaltyCardExpirationText.propTypes = {
  expirationDate: PropTypes.string.isRequired,
  daysForExpiration: PropTypes.string.isRequired,
};

export default LoyaltyCardExpirationText;
