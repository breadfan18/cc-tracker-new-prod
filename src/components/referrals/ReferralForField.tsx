import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { titleCase } from "../../helpers";

export default function ReferrerField({
  referralBonusEarned,
  referringCardholder,
}: {
  referralBonusEarned: boolean;
  referringCardholder: string;
}) {
  return (
    <div
      className="referrerField"
      style={{
        backgroundColor: referralBonusEarned
          ? EDIT_COLOR_GREEN
          : APP_COLOR_BLUE,
      }}
    >
      {
        <BonusEarnStatusIcon
          bonusEarned={referralBonusEarned}
          iconSize="2rem"
          inverseColor
        />
      }
      <p style={{ marginLeft: "5px" }}>{titleCase(referringCardholder)}</p>
    </div>
  );
}
