import {
  APP_COLOR_BLUE,
  APP_COLOR_LIGHT_GRAY,
  DELETE_COLOR_RED,
} from "../../../constants";
import { TextInputProps } from "../../../types/input-types";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
  isRewardsBalance,
  rewardsBalanceText,
  requiredField,
  length,
}: TextInputProps) => {
  return (
    <div className="formFieldContainer">
      <label htmlFor={name} className="labels inputLabels">
        {label}
      </label>
      {requiredField && <p className="requiredField">Required</p>}
      <div
        className="inputContainer"
        style={{
          display: "flex",
          border: error && "2px solid " + DELETE_COLOR_RED,
        }}
      >
        {isCurrency && <p className="currencySymbol">$</p>}
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            paddingLeft: isCurrency ? "5px" : "12px",
          }}
          maxLength={length}
        />
        {isRewardsBalance && (
          <p
            style={{
              padding: "0 10px",
              color: APP_COLOR_BLUE,
              margin: "7px 0",
              borderLeft: "1px solid " + APP_COLOR_LIGHT_GRAY,
              display: "flex",
              alignItems: "center",
              minWidth: "4.5em",
            }}
          >
            {rewardsBalanceText || ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
