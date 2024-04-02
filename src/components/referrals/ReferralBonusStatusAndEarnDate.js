import React, { useEffect } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";

export default function ReferralsBonusStatusAndEarnDate({
  referral,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
}) {
  const { windowWidth, isMobileXS } = useWindhowWidth();
  const hasEarnDate =
    referral.referralEarnDate?.includes("-") && referral.referralBonusEarned;

  const backgroundColor = !isCard
    ? "none"
    : hasEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : APP_COLOR_BLUE_OPACITY;

  useEffect(() => {
    if (isMobileXS) {
      document.documentElement.style.setProperty(
        "--bonus-ribbon-effect",
        "none"
      );
      document.documentElement.style.setProperty("--foo-right", "-8.5px");
    }
  }, [windowWidth]);

  const bonusStatusTextColor = inverseColor
    ? "white"
    : hasEarnDate
    ? "green"
    : APP_COLOR_BLUE;

  return (
    <div
      className={`bonusInfoContainer ${isCard && "bonusInforContainerCard"}`}
      style={{ backgroundColor, padding: isCard && "5px" }}
    >
      {isCard && (
        <BonusEarnStatusIcon
          bonusEarned={referral.referralBonusEarned}
          iconSize={iconSize}
          inverseColor={inverseColor}
        />
      )}
      <div className="bonusInfoTextSection">
        <p
          style={{
            fontSize: isCardTitle ? "1rem" : null,
            color: inverseColor ? "white" : "black",
          }}
        >
          {referral.referralBonus}{" "}
        </p>
        <small style={{ color: bonusStatusTextColor, fontSize: "12px" }}>
          {hasEarnDate
            ? `Earned ${formatDate(referral.referralEarnDate)}`
            : "Bonus In Progress"}
        </small>
      </div>
    </div>
  );
}
