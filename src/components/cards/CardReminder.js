import React from "react";
import PropTypes from "prop-types";

export const CardReminder = ({ text, Icon, iconColor, lastReminder }) => {
  return (
    <>
      <article style={{ display: "flex", alignItems: "center" }}>
        <Icon
          style={{
            color: iconColor,
            fontSize: "1.5rem",
            marginRight: "1rem",
          }}
        />
        <p style={{ marginBottom: 0 }}>{text}</p>
      </article>
      {!lastReminder && <hr style={{ color: "gray" }} />}
    </>
  );
};

CardReminder.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
  lastReminder: PropTypes.bool.isRequired,
};
