import React from "react";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import { formatDate, sortReferralsByDate } from "../../helpers";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import ReferralsBonusStatusAndEarnDate from "../referrals/ReferralBonusStatusAndEarnDate";
import { FaCheck, FaRunning } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function CardReferrals({ cardReferrals }) {
  return (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header className="cardHeaders referralCardHeader">
        <p>Card Referrals</p>
        <Link to={`/referrals`}>
          All Referrals <FaArrowRight style={{ marginLeft: "5px" }} />
        </Link>
      </Card.Header>
      <Card.Body style={{ textAlign: "left", padding: "5px 8px" }}>
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
      </Card.Body>
    </Card>
  );
}
