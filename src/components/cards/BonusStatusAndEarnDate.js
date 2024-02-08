import React from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import { APP_COLOR_BLUE } from "../../constants";

export default function BonusStatusAndEarnDate({ card, isCardTitle, isCard }) {
  const hasBonusEarnDate =
    card.bonusEarnDate?.includes("-") || card.bonusEarned;
  return (
    <div
      style={{
        marginRight: isCardTitle ? "10px" : null,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            fontSize: isCardTitle ? "1rem" : null,
            marginRight: "5px",
          }}
        >
          {card.signupBonus}{" "}
        </p>
        {isCard && (
          <BonusEarnStatusIcon
            bonusEarned={card.bonusEarned}
            iconSize="1.3rem"
          />
        )}
      </div>
      <small
        style={{
          color: hasBonusEarnDate ? "green" : APP_COLOR_BLUE,
          fontSize: "12px",
        }}
      >
        {hasBonusEarnDate
          ? `Earned ${formatDate(card.bonusEarnDate)}`
          : "In Progress"}
      </small>
    </div>
  );
}
