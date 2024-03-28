import React from "react";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import { formatDate, sortReferralsByDate } from "../../helpers";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_BLUE,
  APP_COLOR_BLUE_OPACITY,
  APP_COLOR_LIGHT_GRAY,
  EDIT_COLOR_GREEN,
} from "../../constants";
import ReferralsBonusStatusAndEarnDate from "../referrals/ReferralBonusStatusAndEarnDate";
import { FaCheck, FaRunning } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";

export default function CardReferrals({
  cardReferrals,
  windowWidth,
  cardsByHolder,
}) {
  return (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header className="cardHeaders referralCardHeader">
        <p>Card Referrals</p>
        <Link to={`/referrals`}>
          All Referrals <FaArrowRight style={{ marginLeft: "5px" }} />
        </Link>
      </Card.Header>
      <Card.Body style={{ textAlign: "left", padding: "5px 8px" }}>
        {windowWidth >= 550 ? (
          <Table size="sm" style={{ marginBottom: 0 }}>
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
            {sortReferralsByDate(cardReferrals).map((referral) => (
              <article
                style={{
                  backgroundColor: APP_COLOR_BLACK_OPACITY,
                  margin: "8px 0",
                  padding: "10px",
                  display: "flex",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: referral.referralBonusEarned
                      ? EDIT_COLOR_GREEN
                      : APP_COLOR_BLUE,
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  <BonusEarnStatusIcon
                    bonusEarned={referral.referralBonusEarned}
                    inverseColor
                    iconSize="3rem"
                  />
                  <ReferralsBonusStatusAndEarnDate
                    referral={referral}
                    inverseColor
                  />
                </div>
                <div
                  id="cardReferralsCardSectionRight"
                  style={{ marginLeft: "10px" }}
                >
                  <p>
                    <span>Date:</span> {referral.referralDate}
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
