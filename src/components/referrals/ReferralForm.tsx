import TextInput from "../common/input-fields/TextInput";
import { DELETE_COLOR_RED, ISSUERS, REFERRAL_DATA_KEYS } from "../../constants";
import SelectInput from "../common/input-fields/SelectInput";
import { useSelector } from "react-redux";
import DateInput from "../common/input-fields/DateInput";
import Form from "react-bootstrap/Form";
import { isEmpty } from "lodash";
import { Referral } from "../../types/referral-types";
import { Cardholder } from "../../types/cardholder-types";
import { Card } from "../../types/cards-types";
import { Errors } from "../../types/input-types";
import { MainReduxState } from "../../types/redux";

type ReferralFormProps = {
  referral: Referral;
  cardholders: Cardholder[];
  filteredCards: Card[];
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors?: Errors;
  saving?: boolean;
};

const ReferralForm = ({
  referral,
  cardholders,
  filteredCards,
  onSave,
  onChange,
  errors = {},
  saving,
}: ReferralFormProps) => {
  const buttonText = saving
    ? "Saving..."
    : referral.id === null
    ? "Add Referral"
    : "Save Changes";

  const cards = useSelector((state: MainReduxState) => state.cards);
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
    <form onSubmit={onSave} style={{ margin: 0 }} className="singleColumnForm">
      {!isEmpty(errors) && (
        <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
          Please fill out required fields
        </div>
      )}
      <Form.Check
        name={REFERRAL_DATA_KEYS.referralBonusEarned}
        type="switch"
        label="Referral Earned"
        value={referral.referralBonusEarned.toString()}
        checked={referral.referralBonusEarned}
        onChange={onChange}
        className="bonusEarnedCheck"
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
        value={referral.issuer.name || ""}
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
        requiredField={referral.issuer.name ? true : false}
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

export default ReferralForm;
