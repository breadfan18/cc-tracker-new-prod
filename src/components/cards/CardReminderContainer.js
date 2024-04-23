import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { CardReminder } from "./CardReminder";
import {
  DELETE_COLOR_RED,
  REMINDERS_TEXT_AF,
  REMINDERS_TEXT_AF_DATE_PASSED,
  REMINDERS_TEXT_BONUS,
  REMINDERS_TEXT_BONUS_DATE_PASSED,
} from "../../constants";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { getRemindersData } from "../../hooks/reminderData";
export function CardReminderContainer({ card }) {
  const {
    isAnnualFeeClose,
    isSpendByDateClose,
    bonusNotEarned,
    isLastReminder,
    annualFeeDatePassed,
    spendDaysRemaining,
  } = getRemindersData(card);

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
        {annualFeeDatePassed && (
          <CardReminder
            text={REMINDERS_TEXT_AF_DATE_PASSED}
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
        {spendDaysRemaining < 0 && (
          <CardReminder
            text={REMINDERS_TEXT_BONUS_DATE_PASSED}
            Icon={BsFillBellFill}
            iconColor="orange"
            lastReminder={true}
          />
        )}
        {!isAnnualFeeClose &&
          !isSpendByDateClose &&
          !bonusNotEarned &&
          !annualFeeDatePassed &&
          !spendDaysRemaining < 0 && <div>No Reminders</div>}
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
