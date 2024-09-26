import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  return (
    <div className="formFieldContainer">
      <label htmlFor={name}>{label}</label>
      <div className="inputContainer">
        <input
          type="password"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
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
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
