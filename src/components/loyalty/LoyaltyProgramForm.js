import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/input-fields/TextInput";
import SelectInput from "../common/input-fields/SelectInput";
import { ACCOUNT_TYPE, LOYALTY_DATA_KEYS } from "../../constants";
import { titleCase } from "../../helpers";

const LoyaltyNewProgramForm = ({ errors = {} }) => {
  const [newProgram, setNewProgram] = useState({
    loyaltyType: "",
    programName: "",
  });
  const handleSaveProgram = (e) => {
    e.preventDefault();
    console.log("new program");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSaveProgram} className="singleColumnForm">
      {/* {!isEmpty(errors) && (
        <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
          Please fill out required fields
        </div>
      )} */}
      <SelectInput
        name={LOYALTY_DATA_KEYS.loyaltyType}
        label="Program Type"
        value={newProgram.accountType}
        defaultOption="Select Account Type"
        options={ACCOUNT_TYPE.map((type) => ({
          value: type,
          text: titleCase(type),
        }))}
        onChange={handleChange}
        requiredField
        // error={errors.loyaltyType}
      />
      <TextInput
        name="programName"
        label="Program Name"
        value={newProgram.programName}
        onChange={handleChange}
        requiredField
        // error={errors.title}
      />
      <hr />
      <button
        type="submit"
        // disabled={saving}
        className="btn btn-primary addButton"
      >
        Add Program
      </button>
    </form>
  );
};

LoyaltyNewProgramForm.propTypes = {
  loyaltyAcc: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  filteredPrograms: PropTypes.array.isRequired,
};

export default LoyaltyNewProgramForm;
