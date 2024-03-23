import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { DELETE_COLOR_RED, ISSUERS, REFERRAL_DATA_KEYS } from "../../constants";
import SelectInput from "../common/SelectInput";
import { useSelector } from "react-redux";
import DateInput from "../common/DateInput";
import Form from "react-bootstrap/Form";
import { isEmpty } from "lodash";

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
      {!isEmpty(errors) && (
        <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
          Please fill out required fields
        </div>
      )}
      <Form.Check
        name={REFERRAL_DATA_KEYS.referralBonusEarned}
        type="switch"
        label="Earned"
        value={referral.referralBonusEarned || null}
        checked={referral.referralBonusEarned}
        onChange={onChange}
        style={{ float: "right" }}
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referralFor}
        label="Referral For"
        value={referral.referralFor || ""}
        onChange={onChange}
        error={errors.referralFor}
        requiredField
      />
      <DateInput
        name={REFERRAL_DATA_KEYS.referralDate}
        label="Referral Date"
        value={referral.referralDate}
        onChange={onChange}
        error={errors.referralDate}
        requiredField
      />
      <SelectInput
        name={REFERRAL_DATA_KEYS.issuer}
        label="Issuer"
        value={""}
        defaultOption="Select Issuer"
        options={ISSUERS.map((issuer) => ({
          value: issuer.name,
          text: issuer.name,
        }))}
        onChange={onChange}
        error={errors.issuer}
        // requiredField
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referredCard}
        label="Card"
        value={referral.referredCard || ""}
        onChange={onChange}
        error={errors.referredCard}
        // requiredField={referral.issuer.name && true}
      />
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
        error={errors.referrerId}
        requiredField
      />
      <SelectInput
        name={REFERRAL_DATA_KEYS.referringCardId}
        label="Referring Card"
        value={referral.referringCardId || ""}
        defaultOption="Select Referring Card"
        options={filteredCardsToDisplay}
        onChange={onChange}
        error={errors.referringCardId}
        requiredField
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referralLink}
        label="Referral Link"
        value={referral.referralLink || ""}
        onChange={onChange}
        // error={errors.referralLink}
        // requiredField
      />
      <TextInput
        name={REFERRAL_DATA_KEYS.referralBonus}
        label="Referral Bonus"
        value={referral.referralBonus || ""}
        onChange={onChange}
        error={errors.referralBonus}
        requiredField
      />
      <DateInput
        name={REFERRAL_DATA_KEYS.referralEarnDate}
        label="Referral Earn Date"
        value={referral.referralEarnDate}
        onChange={onChange}
        error={errors.referralEarnDate}
        disabled={!referral.referralBonusEarned}
        requiredField={referral.referralBonusEarned}
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
