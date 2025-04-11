import {
  TbSquareRoundedCheckFilled,
  TbSquareRoundedChevronsRightFilled,
  TbSquareRoundedNumber0Filled,
} from "react-icons/tb";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";

type BonusEarnStatusIconProps = {
  bonusEarned: boolean;
  iconSize?: string;
  inverseColor?: boolean;
  noBonus?: boolean;
};

export default function BonusEarnStatusIcon({
  bonusEarned,
  iconSize,
  inverseColor,
  noBonus,
}: BonusEarnStatusIconProps) {
  return bonusEarned ? (
    <TbSquareRoundedCheckFilled
      style={{
        color: inverseColor ? "white" : EDIT_COLOR_GREEN,
        fontSize: iconSize,
      }}
      title="Bonus Earned"
    />
  ) : noBonus ? (
    <TbSquareRoundedNumber0Filled
      style={{
        color: inverseColor ? "white" : "black",
        fontSize: iconSize,
      }}
      title="No Bonus"
    />
  ) : (
    <TbSquareRoundedChevronsRightFilled
      style={{
        color: inverseColor ? "white" : APP_COLOR_BLUE,
        fontSize: iconSize,
      }}
      title="Working on bonus.."
    />
  );
}
