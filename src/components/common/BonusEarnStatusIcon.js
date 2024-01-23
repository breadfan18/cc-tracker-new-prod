import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { FaPersonRunning } from "react-icons/fa6";

import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import PropTypes from "prop-types";

export default function BonusEarnStatusIcon({ bonusEarned, iconSize }) {
  return bonusEarned ? (
    <TbSquareRoundedCheckFilled
      style={{ color: EDIT_COLOR_GREEN, fontSize: iconSize }}
      title="Bonus Earned"
    />
  ) : (
    <FaPersonRunning
      style={{ color: APP_COLOR_BLUE, fontSize: iconSize }}
      title="Working on bonus.."
    />
  );
}
BonusEarnStatusIcon.propTypes = {
  bonusEarned: PropTypes.bool || undefined,
  iconSize: PropTypes.string,
};
