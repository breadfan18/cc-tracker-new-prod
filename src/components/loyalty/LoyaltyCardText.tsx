import { LOYALTY_DATA_KEYS } from "../../constants";
import { formatDate } from "../../helpers";
import CopyIcon from "../common/CopyIcon";
import { LoyaltyData } from "../../types/loyalty-types";

type LoyaltyCardTextProps = {
  account: LoyaltyData;
  dataType: string;
  showCopyIcon?: boolean;
  dataToCopy?: string;
};

type LoyaltyAccountType = {
  fieldName: string;
  value: string;
};

function LoyaltyCardText({
  account,
  dataType,
  showCopyIcon,
  dataToCopy,
}: LoyaltyCardTextProps) {
  const setLoyaltyAccountType = (
    account: LoyaltyData,
    dataType: string
  ): LoyaltyAccountType => {
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
        return {
          fieldName: "",
          value: "",
        };
    }
  };

  const loyaltyAccountType = setLoyaltyAccountType(account, dataType);
  return (
    <p className="mb-0 cardBodyText">
      <b>{loyaltyAccountType.fieldName}</b>
      {": "}
      <small
        className="cardTextValue"
        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
      >
        {loyaltyAccountType.value}{" "}
        {showCopyIcon && dataToCopy && <CopyIcon dataToCopy={dataToCopy} />}
      </small>
    </p>
  );
}

export default LoyaltyCardText;
