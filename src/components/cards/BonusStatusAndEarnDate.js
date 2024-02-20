import React from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";

export default function BonusStatusAndEarnDate({
  card,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
  isTourDetailsPage,
}) {
  const hasBonusEarnDate =
    card.bonusEarnDate?.includes("-") || card.bonusEarned;

  const backgroundColor = !isCard
    ? "none"
    : hasBonusEarnDate
    ? EDIT_COLOR_GREEN
    : APP_COLOR_BLUE;

  const bonusStatusTextColor = inverseColor
    ? "white"
    : hasBonusEarnDate
    ? "green"
    : APP_COLOR_BLUE;

  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
        borderRadius: "10px 0 0 10px",
        backgroundColor,
      }}
    >
      {isCard && (
        <BonusEarnStatusIcon
          bonusEarned={card.bonusEarned}
          iconSize={iconSize}
          inverseColor={inverseColor}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
      {/* {!isTourDetailsPage && (
        <small
          style={{
            color: inverseColor
              ? "white"
              : hasBonusEarnDate
              ? "green"
              : APP_COLOR_BLUE,
            fontSize: "12px",
          }}
        >
          {hasBonusEarnDate
            ? `Earned ${formatDate(card.bonusEarnDate)}`
            : "Bonus In Progress"}
        </small>
      )} */}
    </div>
  );
}
