import React, { useEffect } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  APP_COLOR_LIGHT_BLACK,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";

export default function BonusStatusAndEarnDate({
  card,
  isCard,
  inverseColor,
  iconSize,
  isCardDetailsPage,
}) {
  const { windowWidth, isMobileXS } = useWindhowWidth();
  const hasBonusEarnDate =
    card.bonusEarnDate?.includes("-") || card.bonusEarned;
  const noBonus = card.signupBonus === undefined || card.signupBonus === "0";

  const backgroundColor = !isCard
    ? "none"
    : hasBonusEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : noBonus
    ? APP_COLOR_LIGHT_BLACK
    : APP_COLOR_BLUE_OPACITY;

  useEffect(() => {
    if (isCardDetailsPage && isMobileXS) {
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
        borderBottomRightRadius: isCardDetailsPage && isMobileXS && "15px",
      }}
    >
      <BonusEarnStatusIcon
        bonusEarned={card.bonusEarned}
        iconSize={iconSize}
        inverseColor={inverseColor}
        noBonus={noBonus}
      />
      <div className="bonusInfoTextSection">
        <p
          style={{
            fontSize: isCard ? "1rem" : "clamp(15px, 2.5vw, 1.2rem)",
            color: inverseColor ? "white" : "black",
            marginBottom: "3px",
          }}
        >
          {noBonus ? "N/A" : card.signupBonus}{" "}
        </p>
        <small
          style={{
            color: bonusStatusTextColor,
            fontSize: "10px",
            marginTop: !isCard && "-7px",
          }}
        >
          {hasBonusEarnDate
            ? `Earned ${formatDate(card.bonusEarnDate)}`
            : noBonus
            ? "No Bonus Offered"
            : "Bonus In Progress"}
        </small>
      </div>
    </div>
  );
}
