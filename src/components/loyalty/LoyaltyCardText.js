import React from "react";
import PropTypes from "prop-types";
import { LOYALTY_DATA_KEYS } from "../../constants";
import { formatDate } from "../../helpers";

function LoyaltyCardText({ account, dataType }) {
  const setLoyaltyAccountType = (account, dataType) => {
    switch (dataType) {
      case LOYALTY_DATA_KEYS.memberId:
        return {
          fieldName: "Member ID",
          value: account.memberId,
        };
      case LOYALTY_DATA_KEYS.loginId:
        return {
          fieldName: "User Name",
          value: account.loginId,
        };
      case LOYALTY_DATA_KEYS.password:
        return {
          fieldName: "Password",
          value: account.password,
        };
      case LOYALTY_DATA_KEYS.rewardsBalance:
        return {
          fieldName: "Rewards Balance",
          value: `${Number(account.rewardsBalance || "0").toLocaleString()} ${
            account.program.type === "airlines" ? "miles" : "points"
          }`,
        };
      case LOYALTY_DATA_KEYS.rewardsExpiration:
        return {
          fieldName: "Rewards Expiration",
          value: formatDate(account.rewardsExpiration),
        };
      default:
        break;
    }
  };

  const loyaltyAccountType = setLoyaltyAccountType(account, dataType);
  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{loyaltyAccountType.fieldName}</b>
        {": "}
        {loyaltyAccountType.value}
      </small>
    </p>
  );
}

LoyaltyCardText.propTypes = {
  account: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default LoyaltyCardText;
