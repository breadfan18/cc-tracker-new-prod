import PropTypes from "prop-types";
import { DELETE_COLOR_RED } from "../../../constants";
import { NumberInputProps } from "../../../types/input-types";

const NumberInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
  requiredField,
}: NumberInputProps) => {
  return (
    <div className="formFieldContainer">
      <label htmlFor={name} className="inputLabels">
        {label}
      </label>
      {requiredField && <p className="requiredField">Required</p>}
      <div
        className="field inputContainer"
        style={{
          display: "flex",
          border: error && "2px solid " + DELETE_COLOR_RED,
        }}
      >
        {isCurrency && <p className="currencySymbol">$</p>}
        <input
          type="number"
          min="0"
          inputMode="numeric"
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
