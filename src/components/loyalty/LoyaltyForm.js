import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  ACCOUNT_TYPE,
  LOYALTY_DATA_KEYS,
  PROGRAMS,
  USERS,
} from "../../constants";
import { titleCase } from "../../helpers";

const LoyaltyForm = ({
  loyaltyAcc,
  onSave,
  onChange,
  filteredPrograms,
  errors = {},
}) => {
  const programsToDisplay =
    filteredPrograms.length === 0
      ? PROGRAMS.filter(
          (program) => program.type === loyaltyAcc?.loyaltyType
        ).map((program) => ({
          value: program.id,
          text: program.name,
        }))
      : filteredPrograms.map((program) => ({
          value: program.id,
          text: program.name,
        }));
  return (
    <form onSubmit={onSave}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name={LOYALTY_DATA_KEYS.userId}
        label="User"
        value={loyaltyAcc.userId || ""}
        defaultOption="Select User"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <SelectInput
        name={LOYALTY_DATA_KEYS.loyaltyType}
        label="Account Type"
        value={loyaltyAcc.loyaltyType || ""}
        defaultOption="Select Account Type"
        options={ACCOUNT_TYPE.map((type) => ({
          value: type,
          text: titleCase(type),
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <SelectInput
        name={LOYALTY_DATA_KEYS.program}
        label="Loyalty Program"
        value={loyaltyAcc.program?.id || ""}
        defaultOption="Select Program"
        options={programsToDisplay}
        onChange={onChange}
        // error={errors.author}
      />
      <TextInput
        name={LOYALTY_DATA_KEYS.memberId}
        label="Member ID"
        value={loyaltyAcc.memberId}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name={LOYALTY_DATA_KEYS.loginId}
        label="User Name"
        value={loyaltyAcc.loginId}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name={LOYALTY_DATA_KEYS.password}
        label="Password"
        value={loyaltyAcc.password}
        onChange={onChange}
        // error={errors.title}
      />
      <hr />
      <button
        type="submit"
        // disabled={saving}
        className="btn btn-primary addButton"
      >
        {loyaltyAcc.id === null ? "Add Account" : "Save Changes"}
      </button>
    </form>
  );
};

LoyaltyForm.propTypes = {
  loyaltyAcc: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  filteredPrograms: PropTypes.array.isRequired,
};

export default LoyaltyForm;
