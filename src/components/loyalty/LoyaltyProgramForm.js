import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/input-fields/TextInput";
import SelectInput from "../common/input-fields/SelectInput";
import {
  ACCOUNT_TYPE,
  DELETE_COLOR_RED,
  LOYALTY_DATA_KEYS,
} from "../../constants";
import { titleCase } from "../../helpers";
import { useDispatch } from "react-redux";
import { saveUserLoyaltyProgramToFirebase } from "../../redux/actions/loyaltyActions";
import { useUser } from "reactfire";
import { isEmpty } from "lodash";

const LoyaltyNewProgramForm = () => {
  const { data: user } = useUser();
  const initialNewProgramState = {
    loyaltyType: "",
    programName: "",
  };
  const dispatch = useDispatch();
  const [newProgram, setNewProgram] = useState(initialNewProgramState);
  const [errors, setErrors] = useState({});

  const handleSaveProgram = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    dispatch(saveUserLoyaltyProgramToFirebase(newProgram, user?.uid));
    setNewProgram(initialNewProgramState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function formIsValid() {
    const { loyaltyType, programName } = newProgram;
    const errors = {};
    if (!loyaltyType) errors.loyaltyType = "Required";
    if (!programName) errors.programName = "Required";
    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }
  return (
    <form onSubmit={handleSaveProgram} className="singleColumnForm">
      {!isEmpty(errors) && (
        <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
          Please fill out required fields
        </div>
      )}

      <SelectInput
        name={LOYALTY_DATA_KEYS.loyaltyType}
        label="Program Type"
        value={newProgram.loyaltyType || ""}
        defaultOption="Select Account Type"
        options={ACCOUNT_TYPE.map((type) => ({
          value: type,
          text: titleCase(type),
        }))}
        onChange={handleChange}
        requiredField
        error={errors.loyaltyType}
      />
      <TextInput
        name="programName"
        label="Program Name"
        value={newProgram.programName}
        onChange={handleChange}
        requiredField
        error={errors.programName}
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

/* 
- need to setup errors and form validation in this page
*/
