import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import { formatDate, sortReferralsByDate } from "../../helpers";
import {
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  EDIT_COLOR_GREEN,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import ReferralsBonusStatusAndEarnDate from "../referrals/ReferralBonusStatusAndEarnDate";
import { FaCheck, FaRunning } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";
import { Referral } from "../../types/referral-types";

type CardReferralsProps = {
  cardReferrals: Referral[];
  windowWidth: number;
};

export default function CardReferrals({
  cardReferrals,
  windowWidth,
}: CardReferralsProps) {
  const theme = useSelector((state: MainReduxState) => state.theme);

  return (
    <Card
      className={`text-center ${theme === "dark" && "bg-dark"}`}
      style={{
        boxShadow:
          theme === "dark" ? "0 0 3px rgb(168, 166, 166)" : "2px 0 10px gray",
      }}
    >
      <Card.Header className="cardHeaders referralCardHeader">
        <p>Card Referrals</p>
        <Link to={`/referrals`}>
          All Referrals <FaArrowRight style={{ marginLeft: "5px" }} />
        </Link>
      </Card.Header>
      <Card.Body style={{ textAlign: "left", padding: "5px 8px" }}>
        {windowWidth >= 550 ? (
          <Table
            size="sm"
            style={{ marginBottom: 0 }}
            variant={theme === "dark" ? "dark" : undefined}
          >
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Referred For</th>
                <th>Card</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {sortReferralsByDate(cardReferrals).map((referral) => (
                <tr key={referral.id} style={{ verticalAlign: "middle" }}>
                  <td>
                    {referral.referralBonusEarned ? (
                      <FaCheck style={{ color: EDIT_COLOR_GREEN }} />
                    ) : (
                      <FaRunning style={{ color: APP_COLOR_BLUE }} />
                    )}
                  </td>
                  <td>{formatDate(referral.referralDate)}</td>
                  <td>{referral.referralFor}</td>
                  <td>
                    {!referral.referredCard || referral.referredCard === "" ? (
                      "Unknown"
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          className="issuerLogos"
                          src={referral.issuer.img}
                          alt=""
                          style={{ marginRight: "4px" }}
                        />
                        <p>{referral.referredCard}</p>
                      </div>
                    )}
                  </td>
                  <td>
                    <ReferralsBonusStatusAndEarnDate referral={referral} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <>
            {sortReferralsByDate(cardReferrals).map((referral: Referral) => (
              <article className="cardDetailsReferralCardContainer">
                <div
                  className="cardDetailsReferralCardBonusSection"
                  style={{
                    backgroundColor: referral.referralBonusEarned
                      ? EDIT_COLOR_GREEN_OPACITY
                      : APP_COLOR_BLUE_OPACITY,
                  }}
                >
                  <div className="cardDetailsReferralCardBonusSectionTop">
                    <BonusEarnStatusIcon
                      bonusEarned={referral.referralBonusEarned}
                      inverseColor
                      iconSize="clamp(1.5rem, 10vw, 1.5rem)"
                    />
                    <p>{referral.referralBonus}</p>
                  </div>
                  <small className="cardDetailsReferralCardBonusText">
                    {referral.referralEarnDate?.includes("-") &&
                    referral.referralBonusEarned
                      ? `Earned ${formatDate(referral.referralEarnDate)}`
                      : "Bonus In Progress"}
                  </small>
                </div>
                <div
                  id="cardReferralsCardSectionRight"
                  style={{ marginLeft: "10px" }}
                >
                  <p>
                    <span>Date:</span> {formatDate(referral.referralDate)}
                  </p>
                  <p>
                    <span>For:</span> {referral.referralFor}
                  </p>
                  <p>
                    <span>Card:</span>{" "}
                    {`${referral.issuer.name} - ${referral.referredCard}`}
                  </p>
                </div>
              </article>
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
