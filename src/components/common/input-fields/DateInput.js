import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { APP_COLOR_BLUE, CANCELLED_COLOR_RED } from "../../../constants";
import { useRequiredLabelPosition } from "../../../hooks/useRequiredLabelPosition";

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
    <div className="input-container">
      <label
        htmlFor={name}
        className="labels inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
        {requiredField && (
          <p className="requiredField cardFormRequiredField">Required</p>
        )}
      </label>
      <div className="field">
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
