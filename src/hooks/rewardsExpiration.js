import { daysTillRewardsExpiration } from "../helpers";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { DELETE_COLOR_RED } from "../constants";

export const getRewardsExpirationStuff = (acc) => {
  const daysForRewardExpiration = daysTillRewardsExpiration(
    acc.rewardsExpiration
  );

  const rewardsExpirationIcon =
    daysForRewardExpiration > 30 && daysForRewardExpiration <= 90 ? (
      <BsFillBellFill
        style={{ color: "orange", fontSize: "1.3rem", marginRight: "5px" }}
      />
    ) : daysForRewardExpiration <= 30 ? (
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
