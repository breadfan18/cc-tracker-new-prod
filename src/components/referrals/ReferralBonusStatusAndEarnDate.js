import React, { useContext, useEffect, useState } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import { WindowWidthContext } from "../App";

export default function ReferralsBonusStatusAndEarnDate({
  referral,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
  // isCardDetailsPage,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const hasEarnDate =
    referral.referralEarnDate?.includes("-") && referral.referralBonusEarned;

  const backgroundColor = !isCard
    ? "none"
    : hasEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : APP_COLOR_BLUE_OPACITY;

  useEffect(() => {
    if (windowWidth < 500) {
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
      style={{
        // "--bonus-info-container-bkgrd": backgroundColor,
        backgroundColor,
        // paddingRight: isCardDetailsPage && "27px",
        padding: isCard && "5px",
        borderBottomRightRadius: windowWidth < 500 && "15px",
      }}
    >
      {isCard && (
        <BonusEarnStatusIcon
          bonusEarned={referral.bonusEarned}
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
