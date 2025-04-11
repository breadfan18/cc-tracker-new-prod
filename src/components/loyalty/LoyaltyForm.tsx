import { isEmpty } from "lodash";
import TextInput from "../common/input-fields/TextInput";
import SelectInput from "../common/input-fields/SelectInput";
import {
  ACCOUNT_TYPE,
  DELETE_COLOR_RED,
  LOYALTY_DATA_KEYS,
} from "../../constants";
import { titleCase } from "../../helpers";
import DateInput from "../common/input-fields/DateInput";
import { LoyaltyData, LoyaltyProgram } from "../../types/loyalty-types";
import { Cardholder } from "../../types/cardholder-types";
import { Errors } from "../../types/input-types";

type LoyaltyFormProps = {
  loyaltyAcc: LoyaltyData;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filteredPrograms: LoyaltyProgram[];
  cardholders: Cardholder[];
  errors?: Errors;
};

const LoyaltyForm = ({
  loyaltyAcc,
  onSave,
  onChange,
  filteredPrograms,
  cardholders,
  errors = {},
}: LoyaltyFormProps) => {
  const programsToDisplay = filteredPrograms.map((program) => ({
    value: program.id ?? "",
    text: program.name,
  }));
  return (
    <form onSubmit={onSave} className="singleColumnForm">
      {!isEmpty(errors) && (
        <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
          Please fill out required fields
        </div>
      )}
      <SelectInput
        name={LOYALTY_DATA_KEYS.userId}
        label="Account Holder"
        value={loyaltyAcc.userId || ""}
        defaultOption="Select Account Holder"
        options={cardholders.map((holder) => ({
          value: holder.id,
          text: holder.name,
        }))}
        onChange={onChange}
        requiredField
        error={errors.userId}
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
        requiredField
        error={errors.loyaltyType}
      />
      <SelectInput
        name={LOYALTY_DATA_KEYS.program}
        label="Loyalty Program"
        value={loyaltyAcc.program?.id || ""}
        defaultOption="Select Program"
        options={programsToDisplay}
        onChange={onChange}
        error={errors.program}
        requiredField
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
      <TextInput
        name={LOYALTY_DATA_KEYS.rewardsBalance}
        label="Rewards Balance"
        value={loyaltyAcc.rewardsBalance}
        onChange={onChange}
        isRewardsBalance={true}
        rewardsBalanceText={
          loyaltyAcc.program?.type === "airlines" ? "miles" : "points"
        }
        // error={errors.title}
      />
      <DateInput
        name={LOYALTY_DATA_KEYS.rewardsExpiration}
        label="Rewards Expiration"
        value={loyaltyAcc.rewardsExpiration}
        onChange={onChange}
        disabled={
          !loyaltyAcc.rewardsBalance || loyaltyAcc.rewardsBalance === "0"
        }
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

export default LoyaltyForm;
