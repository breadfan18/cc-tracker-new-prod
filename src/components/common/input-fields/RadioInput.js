import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { CANCELLED_COLOR_RED } from "../../../constants";

const RadioInput = ({
  name,
  label,
  error,
  inquiriesStatus,
  onChange,
  requiredField,
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
      <div className="inputContainer radioField">
        <Form.Check
          name="inquiries"
          type="switch"
          label="Experian"
          value="experian"
          checked={inquiriesStatus.experian}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="inquiries"
          label="Equifax"
          value="equifax"
          checked={inquiriesStatus.equifax}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="inquiries"
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
