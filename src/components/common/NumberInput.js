import React from "react";
import PropTypes from "prop-types";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_BLUE,
  CANCELLED_COLOR_RED,
} from "../../constants";
import { useSelector } from "react-redux";

const NumberInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  const theme = useSelector((state) => state.theme);

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={name}
        className="inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
        {error && (
          <p
            style={{
              margin: "0 10px 0 0",
              color: APP_COLOR_BLUE,
              fontSize: "0.8rem",
            }}
          >
            Required
          </p>
        )}
      </label>
      <div
        className="field transparentPlaceholderField"
        style={{ display: "flex" }}
      >
        {isCurrency && (
          <p
            style={{
              padding: "0 10px",
              backgroundColor:
                theme === "light" ? APP_COLOR_BLACK_OPACITY : "white",
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
          type="number"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            borderRadius: isCurrency && "0 0 10px 0",
          }}
        />
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  isCurrency: PropTypes.bool,
  error: PropTypes.string,
};

export default NumberInput;
