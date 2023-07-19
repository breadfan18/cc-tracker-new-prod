import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from "prop-types";

export function FiveTwentyFourStatus({ percent, label }) {
  return (
    <>
      <p style={{ marginBottom: "2px" }}>524 Status Tracker</p>
      <ProgressBar
        variant={
          percent >= 80
            ? "danger"
            : percent < 80 && percent > 20
            ? "warning"
            : "success"
        }
        now={percent}
        label={label}
        style={{
          minHeight: "2.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
        // striped
      />
    </>
  );
}

FiveTwentyFourStatus.propTypes = {
  percent: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
