import React, { useContext, useEffect, useState } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import { WindowWidthContext } from "../App";

export default function BonusStatusAndEarnDate({
  card,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
  isCardDetailsPage,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const hasBonusEarnDate =
    card.bonusEarnDate?.includes("-") || card.bonusEarned;

  const backgroundColor = !isCard
    ? "none"
    : hasBonusEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : APP_COLOR_BLUE_OPACITY;

  useEffect(() => {
    if (isCardDetailsPage && windowWidth < 500) {
      document.documentElement.style.setProperty(
        "--bonus-ribbon-effect",
        "none"
      );
      document.documentElement.style.setProperty("--foo-right", "-8.5px");
    } else if (isCardDetailsPage) {
      document.documentElement.style.setProperty(
        "--bonus-ribbon-effect",
        "block"
      );
    }
  }, [windowWidth]);

  const bonusStatusTextColor = inverseColor
    ? "white"
    : hasBonusEarnDate
    ? "green"
    : APP_COLOR_BLUE;

  return (
    <div
      className={`bonusInfoContainer ${isCard && "bonusInforContainerCard"}`}
      style={{
        // "--bonus-info-container-bkgrd": backgroundColor,
        backgroundColor,
        paddingRight: isCardDetailsPage && "27px",
        padding: isCard && "5px",
        borderBottomRightRadius:
          isCardDetailsPage && windowWidth < 500 && "15px",
      }}
    >
      <BonusEarnStatusIcon
        bonusEarned={card.bonusEarned}
        iconSize={iconSize}
        inverseColor={inverseColor}
      />
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
