import React from "react";
import PropTypes from "prop-types";
import { APP_COLOR_BLACK_OPACITY } from "../../constants";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
  isRewardsBalance,
  rewardsBalanceText,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  const fieldBorderRadius = isCurrency
    ? "0 0 10px 0"
    : isRewardsBalance
    ? "0 0 0 10px"
    : "0 0 10px 10px";

  return (
    <div className={wrapperClass}>
      <label htmlFor={name} className="labels">
        {label}
      </label>
      <div className="field" style={{ display: "flex" }}>
        {isCurrency && (
          <p
            style={{
              padding: "0 10px",
              backgroundColor: APP_COLOR_BLACK_OPACITY,
              marginBottom: 0,
              borderRadius: "0 0 0 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            $
          </p>
        )}
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            borderRadius: fieldBorderRadius,
            paddingLeft: isCurrency ? "5px" : "12px",
          }}
        />
        {isRewardsBalance && (
          <p
            style={{
              padding: "0 10px",
              backgroundColor: APP_COLOR_BLACK_OPACITY,
              marginBottom: 0,
              borderRadius: "0 0 10px 0",
              display: "flex",
              alignItems: "center",
              minWidth: "5.5rem",
            }}
          >
            {rewardsBalanceText || ""}
          </p>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  isCurrency: PropTypes.bool,
  error: PropTypes.string,
};

export default TextInput;
