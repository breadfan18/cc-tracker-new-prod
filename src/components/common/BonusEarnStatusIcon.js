import React from "react";
import {
  TbSquareRoundedCheckFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import PropTypes from "prop-types";

export default function BonusEarnStatusIcon({ bonusEarned, iconSize }) {
  return bonusEarned ? (
    <TbSquareRoundedCheckFilled
      style={{ color: EDIT_COLOR_GREEN, fontSize: iconSize }}
    />
  ) : (
    <TbSquareRoundedChevronsRightFilled
      style={{ color: APP_COLOR_BLUE, fontSize: iconSize }}
    />
  );
}
BonusEarnStatusIcon.propTypes = {
  bonusEarned: PropTypes.bool || undefined,
  iconSize: PropTypes.string,
};
