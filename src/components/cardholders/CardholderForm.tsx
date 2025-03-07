import React from "react";
import TextInput from "../common/input-fields/TextInput";
import { CardholderForModalType } from "../../types/cardholder-types";
import { Errors } from "../../types/input-types";

type CardholderFormProps = {
  cardholder: CardholderForModalType;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors?: Errors;
  saving?: boolean;
};

const CardholderForm = ({
  cardholder,
  onSave,
  onChange,
  errors = {},
  saving,
}: CardholderFormProps) => {
  const buttonText = saving
    ? "Saving..."
    : cardholder.id === null
    ? "Add Card Holder"
    : "Save Changes";

  return (
    <form onSubmit={onSave} style={{ margin: 0 }} className="singleColumnForm">
      <TextInput
        name="firstName"
        label="First Name"
        value={cardholder.firstName || ""}
        onChange={onChange}
        error={errors.firstName}
        requiredField
      />
      <TextInput
        name="lastName"
        label="Last Name"
        value={cardholder.lastName || ""}
        onChange={onChange}
        error={errors.lastName}
        requiredField
      />
      <hr />
      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary addButton"
        // onClick={() => setSaving(true)}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CardholderForm;
