import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { APP_COLOR_BLUE, CANCELLED_COLOR_RED } from "../../../constants";

const RadioInput = ({
  name,
  label,
  error,
  inquiriesStatus,
  onChange,
  requiredField,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

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
          <p className="requiredField" style={{ left: "680px" }}>
            Required
          </p>
        )}
      </label>
      <div className="field radioField">
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Experian"
          value="experian"
          checked={inquiriesStatus.experian}
          onChange={onChange}
          className="testing"
        />
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Equifax"
          value="equifax"
          checked={inquiriesStatus.equifax}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Transunion"
          value="transunion"
          checked={inquiriesStatus.transunion}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inquiriesStatus: PropTypes.object.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RadioInput;
