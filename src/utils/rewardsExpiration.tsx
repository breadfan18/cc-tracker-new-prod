import { daysTillRewardsExpiration } from "../helpers";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { DELETE_COLOR_RED } from "../constants";
import { LoyaltyData } from "../types/loyalty-types";

type RewardsExpirationStuff = {
  daysForRewardExpiration?: number;
  rewardsExpirationIcon: JSX.Element | string;
};

export const getRewardsExpirationStuff = (
  loyaltyAcc: LoyaltyData
): RewardsExpirationStuff => {
  const daysForRewardExpiration = daysTillRewardsExpiration(
    loyaltyAcc.rewardsExpiration
  );

  const rewardsExpirationIcon =
    daysForRewardExpiration &&
    daysForRewardExpiration > 30 &&
    daysForRewardExpiration <= 90 ? (
      <BsFillBellFill
        style={{ color: "orange", fontSize: "1.3rem", marginRight: "5px" }}
      />
    ) : daysForRewardExpiration && daysForRewardExpiration <= 30 ? (
      <TbAlertOctagonFilled
        style={{
          color: DELETE_COLOR_RED,
          fontSize: "1.3rem",
          marginRight: "5px",
        }}
      />
    ) : (
      ""
    );

  return { daysForRewardExpiration, rewardsExpirationIcon };
};
