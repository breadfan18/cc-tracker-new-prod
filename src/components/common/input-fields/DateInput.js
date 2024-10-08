import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { DELETE_COLOR_RED } from "../../../constants";

const DateInput = ({
  name,
  label,
  onChange,
  value,
  error,
  disabled,
  requiredField,
}) => {
  return (
    <div className="formFieldContainer">
      <label htmlFor={name} className="labels inputLabels">
        {label}
      </label>
      {requiredField && <p className="requiredField">Required</p>}
      <div
        className="field inputContainer"
        style={{ border: error && "2px solid " + DELETE_COLOR_RED }}
      >
        <Form.Control
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default DateInput;
