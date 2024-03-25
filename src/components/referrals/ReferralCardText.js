import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, formatDate } from "../../helpers";
import { REFERRAL_DATA_KEYS } from "../../constants";
import { getReferralData } from "../../hooks/referralsData";

function ReferralCardText({ referral, dataType, cardsByHolder }) {
  console.log(referral);
  console.log(dataType);

  const { referringCard, referringCardholder } = getReferralData(
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
      case REFERRAL_DATA_KEYS.referrerId:
        return {
          fieldName: "Referrer",
          value: referringCardholder,
        };
      case REFERRAL_DATA_KEYS.referringCardId:
        return {
          fieldName: "Referring Card",
          value: `${referringCard.issuer.name} ${referringCard.card}`,
        };
      default:
        break;
    }
  };

  const { fieldName, value } = setCardDataType(referral, dataType);

  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{fieldName}</b>
        {": "}
        {value}
      </small>
    </p>
  );
}

ReferralCardText.propTypes = {
  card: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default ReferralCardText;
