import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { CANCELLED_COLOR_RED } from "../../../constants";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  bkgrdColor,
  disableDefaultOption = true,
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
      <div className="inputContainer">
        <Form.Select
          aria-label={defaultOption}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          style={{ backgroundColor: `${bkgrdColor}` }}
        >
          <option value="" disabled={disableDefaultOption}>
            {defaultOption}
          </option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </Form.Select>
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  bkgrdColor: PropTypes.string,
  disableDefaultOption: PropTypes.bool,
};

export default SelectInput;
