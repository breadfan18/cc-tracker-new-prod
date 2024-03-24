import React from "react";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { titleCase } from "../../helpers";

export default function ReferralForField({ referral }) {
  return (
    <div
      style={{
        backgroundColor: referral.referralBonusEarned
          ? EDIT_COLOR_GREEN
          : APP_COLOR_BLUE,
        borderRadius: "0 15px 15px 0",
        padding: "5px 3px",
        display: "flex",
        color: "white",
        alignItems: "center",
      }}
    >
      {
        <BonusEarnStatusIcon
          bonusEarned={referral.referralBonusEarned}
          iconSize="2rem"
          inverseColor
        />
      }
      <p style={{ marginLeft: "5px" }}>{titleCase(referral.referralFor)}</p>
    </div>
  );
}
