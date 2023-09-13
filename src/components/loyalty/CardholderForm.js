import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const CardholderForm = ({ cardholder, onSave, onChange, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
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
        // error={errors.title}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        value={cardholder.lastName || ""}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="imgUrl"
        label="Image URL"
        value={cardholder.img || ""}
        onChange={onChange}
        // error={errors.title}
      />
      <input type="file" onChange={onChange} name="imgFile" />
      <hr />
      <button
        type="submit"
        // disabled={saving}
        className="btn btn-primary addButton"
      >
        {cardholder.id === null ? "Add Card Holder" : "Save Changes"}
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
