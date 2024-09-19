import React from "react";
import PropTypes from "prop-types";
import { CANCELLED_COLOR_RED } from "../../../constants";

const NumberInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
  isRequired,
}) => {
  return (
    <div className="formFieldContainer">
      <label
        htmlFor={name}
        className="inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
      </label>
      {isRequired && <p className="requiredField">Required</p>}
      <div className="field inputContainer" style={{ display: "flex" }}>
        {isCurrency && <p className="currencySymbol">$</p>}
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
