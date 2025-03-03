import { useEffect } from "react";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";
import { useSelector } from "react-redux";
import { Referral } from "../../types/cardsTypes";
import { MainReduxState } from "../../types/redux";

type ReferralsBonusStatusAndEarnDateProps = {
  referral: Referral;
  isCardTitle?: boolean;
  isCard?: boolean;
  inverseColor?: boolean;
  iconSize?: string;
};

export default function ReferralsBonusStatusAndEarnDate({
  referral,
  isCardTitle,
  isCard,
  inverseColor,
  iconSize,
}: ReferralsBonusStatusAndEarnDateProps) {
  const { isDesktop, windowWidth, isMobileXS } = useWindhowWidth();
  const hasEarnDate =
    referral.referralEarnDate?.includes("-") && referral.referralBonusEarned;
  const theme = useSelector((state: MainReduxState) => state.theme);

  const backgroundColor = !isCard
    ? "none"
    : hasEarnDate
    ? EDIT_COLOR_GREEN_OPACITY
    : APP_COLOR_BLUE_OPACITY;

  useEffect(() => {
    if (isMobileXS) {
      document.documentElement.style.setProperty(
        "--bonus-ribbon-effect",
        "none"
      );
      document.documentElement.style.setProperty("--foo-right", "-8.5px");
    }
  }, [windowWidth]);

  const bonusStatusTextColor = inverseColor
    ? "white"
    : hasEarnDate
    ? "green"
    : APP_COLOR_BLUE;

  return (
    <div
      className={`bonusInfoContainer ${isCard && "bonusInforContainerCard"}`}
      style={{ backgroundColor, padding: isCard ? "5px" : undefined }}
    >
      {isCard && (
        <BonusEarnStatusIcon
          bonusEarned={referral.referralBonusEarned}
          iconSize={iconSize || undefined}
          inverseColor={inverseColor}
        />
      )}
      <div className="bonusInfoTextSection">
        <p
          style={{
            fontSize: isCardTitle ? "1rem" : undefined,
            color:
              (isDesktop && theme === "dark") || inverseColor
                ? "white"
                : "black",
          }}
        >
          {referral.referralBonus}{" "}
        </p>
        <small style={{ color: bonusStatusTextColor, fontSize: "12px" }}>
          {hasEarnDate
            ? `Earned ${formatDate(referral.referralEarnDate)}`
            : "Bonus In Progress"}
        </small>
      </div>
    </div>
  );
}
