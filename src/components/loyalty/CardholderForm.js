import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/input-fields/TextInput";
import PhotoEditor from "../cardholders/PhotoEditor";

const CardholderForm = ({
  cardholder,
  onSave,
  onChange,
  errors = {},
  saving,
}) => {
  const buttonText = saving
    ? "Saving..."
    : cardholder.id === null
    ? "Add Card Holder"
    : "Save Changes";

  return (
    <form onSubmit={onSave} style={{ margin: 0 }} className="singleColumnForm">
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
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

CardholderForm.propTypes = {
  cardholder: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardholderForm;
