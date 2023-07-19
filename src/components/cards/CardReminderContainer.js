import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { CardReminder } from "./CardReminder";
import { isDateApproaching } from "../../helpers";
import {
  CARD_DATA_KEYS,
  DELETE_COLOR_RED,
  REMINDERS_TEXT_AF,
  REMINDERS_TEXT_BONUS,
} from "../../constants";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
export function CardReminderContainer({ card }) {
  const isAnnualFeeClose = isDateApproaching(
    card,
    CARD_DATA_KEYS.nextFeeDate,
    90
  );
  const isSpendByDateClose = isDateApproaching(
    card,
    CARD_DATA_KEYS.spendBy,
    30
  );

  const bonusNotEarned =
    isSpendByDateClose && (card.bonusEarned === undefined || !card.bonusEarned);
  const isLastReminder =
    isAnnualFeeClose && isSpendByDateClose && bonusNotEarned ? false : true;

  return (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header className="cardHeaders">Card Reminders</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        {isAnnualFeeClose && (
          <CardReminder
            text={REMINDERS_TEXT_AF}
            Icon={TbAlertOctagonFilled}
            iconColor={DELETE_COLOR_RED}
            lastReminder={isLastReminder}
          />
        )}
        {bonusNotEarned && (
          <CardReminder
            text={REMINDERS_TEXT_BONUS}
            Icon={BsFillBellFill}
            iconColor="orange"
            lastReminder={true}
          />
        )}
        {!isAnnualFeeClose && !isSpendByDateClose && !bonusNotEarned && (
          <div>No Reminders</div>
        )}
      </Card.Body>
      <Card.Footer
        className="text-muted notesFooter"
        style={{ padding: "10px" }}
      ></Card.Footer>
    </Card>
  );
}

CardReminderContainer.propTypes = {
  card: PropTypes.object.isRequired,
};
