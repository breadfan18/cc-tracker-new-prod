import React, { useEffect, useState } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";

export default function BonusStatusAndEarnDate({
  card,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
  isTourDetailsPage,
}) {
  // const [dynamicValue, setDynamicValue] = useState("initialValue");
  const hasBonusEarnDate =
    card.bonusEarnDate?.includes("-") || card.bonusEarned;

  const backgroundColor = !isCard
    ? "none"
    : hasBonusEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : APP_COLOR_BLUE_OPACITY;

  // console.log("Background Color", backgroundColor);

  // useEffect(() => {

  //   setDynamicValue(backgroundColor);

  //   document.documentElement.style.setProperty(
  //     "--bonus-info-container-bkgrd",
  //     !isCard
  //       ? "none"
  //       : hasBonusEarnDate
  //       ? EDIT_COLOR_GREEN_OPACITY
  //       : APP_COLOR_BLUE_OPACITY
  //   );

  //   console.log(
  //     "Set Property",
  //     document.documentElement.style.getPropertyValue(
  //       "--bonus-info-container-bkgrd"
  //     )
  //   );
  // }, [isCard, hasBonusEarnDate]);

  const bonusStatusTextColor = inverseColor
    ? "white"
    : hasBonusEarnDate
    ? "green"
    : APP_COLOR_BLUE;

  return (
    <div
      className="bonusInfoContainer"
      style={{
        // "--bonus-info-container-bkgrd": backgroundColor,
        backgroundColor,
        paddingRight: isTourDetailsPage && "27px",
      }}
    >
      {isCard && (
        <BonusEarnStatusIcon
          bonusEarned={card.bonusEarned}
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
          {card.signupBonus}{" "}
        </p>
        <small style={{ color: bonusStatusTextColor, fontSize: "12px" }}>
          {hasBonusEarnDate
            ? `Earned ${formatDate(card.bonusEarnDate)}`
            : "Bonus In Progress"}
        </small>
      </div>
    </div>
  );
}
