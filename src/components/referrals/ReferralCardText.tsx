import { formatDate } from "../../helpers";
import { REFERRAL_DATA_KEYS } from "../../constants";
import { getReferralData } from "../../hooks/referralsData";
import { Referral } from "../../types/cards-types";
import { CardsByHolder } from "../../types/cardholder-types";

type ReferralCardTextProps = {
  referral: Referral;
  dataType: string;
  cardsByHolder: CardsByHolder;
};

function ReferralCardText({
  referral,
  dataType,
  cardsByHolder,
}: ReferralCardTextProps) {
  const { referralFor, referredCard, issuer } = getReferralData(
    referral,
    cardsByHolder
  );

  const setCardDataType = (referral, dataType) => {
    switch (dataType) {
      case REFERRAL_DATA_KEYS.referralDate:
        return {
          fieldName: "Referral Date",
          value: formatDate(referral.referralDate),
        };
      case REFERRAL_DATA_KEYS.referralFor:
        return {
          fieldName: "Referral For",
          value: referralFor,
        };
      case REFERRAL_DATA_KEYS.referredCard:
        return {
          fieldName: "Referred Card",
          value: `${issuer.name} ${referredCard}`,
        };
      default:
        return {
          fieldName: "",
          value: "",
        };
    }
  };

  const { fieldName, value } = setCardDataType(referral, dataType);

  return (
    <p className="mb-0 cardBodyText">
      <b>{fieldName}</b>
      {": "}
      <small className="cardTextValue">{value}</small>
    </p>
  );
}

export default ReferralCardText;
