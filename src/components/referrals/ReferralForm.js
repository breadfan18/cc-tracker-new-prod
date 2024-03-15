import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { CARD_DATA_KEYS, REFERRAL_DATA_KEYS } from "../../constants";
import SelectInput from "../common/SelectInput";
import { useSelector } from "react-redux";

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

  const cards = useSelector((state) => state.cards);
  const filteredCardsToDisplay = referral.id
    ? cards
        .filter(
          (card) =>
            card.userId === referral.referrerId && card.status === "open"
        )
        .map((card) => ({
          value: card.id,
          text: `${card.issuer.name} - ${card.card}`,
        }))
    : filteredCards.map((card) => ({
        value: card.id,
        text: `${card.issuer.name} - ${card.card}`,
      }));

  return (
    <form onSubmit={onSave} style={{ margin: 0 }}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name={REFERRAL_DATA_KEYS.referrerId}
        label="Referrer"
        value={referral.referrerId || ""}
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
        name={REFERRAL_DATA_KEYS.referringCardId}
        label="Referring Card"
        value={referral.referringCardId || ""}
        defaultOption="Select Referring Card"
        options={filteredCardsToDisplay}
        onChange={onChange}
        error={errors.userId}
        requiredField
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referralLink}
        label="Referral Link"
        value={referral.referralLink || ""}
        onChange={onChange}
        error={errors.referralLink}
        requiredField
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referralBonus}
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
