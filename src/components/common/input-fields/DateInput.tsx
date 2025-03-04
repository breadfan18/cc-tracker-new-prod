import Form from "react-bootstrap/Form";
import { DELETE_COLOR_RED } from "../../../constants";
import { DateInputProps } from "../../../types/input-types";

const DateInput = ({
  name,
  label,
  onChange,
  value,
  error,
  disabled,
  requiredField,
}: DateInputProps) => {
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

export default DateInput;
