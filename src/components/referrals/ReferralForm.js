import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { CARD_DATA_KEYS } from "../../constants";
import SelectInput from "../common/SelectInput";

const ReferralForm = ({
  referral,
  cardholders,
  filteredCards,
  onSave,
  onChange,
  errors = {},
  saving,
}) => {
  const buttonText = saving
    ? "Saving..."
    : referral.id === null
    ? "Add Referral"
    : "Save Changes";

  return (
    <form onSubmit={onSave} style={{ margin: 0 }}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name="referrer"
        label="Referrer"
        value={referral.referrer || ""}
        defaultOption="Select Referring User"
        options={cardholders.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={onChange}
        error={errors.userId}
        requiredField
      />
      <SelectInput
        name="referringCard"
        label="Referring Card"
        value={referral.referringCard || ""}
        defaultOption="Select Referring Card"
        options={filteredCards.map((card) => ({
          value: card.id,
          text: `${card.issuer.name} - ${card.card}`,
        }))}
        onChange={onChange}
        error={errors.userId}
        requiredField
      />
      <TextInput
        name="referralLink"
        label="Referral Link"
        value={referral.referralLink || ""}
        onChange={onChange}
        error={errors.referralLink}
        requiredField
      />
      <TextInput
        name="referralBonus"
        label="Referral Bonus"
        value={referral.referralBonus || ""}
        onChange={onChange}
        error={errors.referralBonus}
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

ReferralForm.propTypes = {
  cardholder: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ReferralForm;
