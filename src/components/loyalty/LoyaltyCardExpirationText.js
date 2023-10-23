import React from "react";
import PropTypes from "prop-types";
import { DELETE_COLOR_RED } from "../../constants";

function LoyaltyCardExpirationText({ expirationDate, daysForExpiration }) {
  return (
    <div className="mb-0 text-muted">
      <small style={{ display: "flex", alignItems: "center" }}>
        <b style={{ color: "black" }}>Expiration</b>
        {": "}
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
    </div>
  );
}

LoyaltyCardExpirationText.propTypes = {
  expirationDate: PropTypes.string.isRequired,
  daysForExpiration: PropTypes.string.isRequired,
};

export default LoyaltyCardExpirationText;
