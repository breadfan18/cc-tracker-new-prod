import React from "react";
import PropTypes from "prop-types";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_BLUE,
  APP_COLOR_LIGHT_GRAY,
  CANCELLED_COLOR_RED,
} from "../../../constants";

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
  requiredField,
  length,
}) => {
  return (
    <div className="formFieldContainer">
      <label
        htmlFor={name}
        className="labels inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
      </label>
      {requiredField && <p className="requiredField">Required</p>}
      <div className="inputContainer" style={{ display: "flex" }}>
        {isCurrency && <p className="currencySymbol">$</p>}
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            paddingLeft: isCurrency ? "5px" : "12px",
          }}
          maxLength={length}
        />
        {isRewardsBalance && (
          <p
            style={{
              padding: "0 10px",
              color: APP_COLOR_BLUE,
              margin: "7px 0",
              borderLeft: "1px solid " + APP_COLOR_LIGHT_GRAY,
              display: "flex",
              alignItems: "center",
              minWidth: "4.5em",
            }}
          >
            {rewardsBalanceText || ""}
          </p>
        )}
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
