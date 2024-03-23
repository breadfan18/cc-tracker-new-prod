import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ReferralAddEditModal from "./ReferralAddEditModal";
import { formatDate, titleCase } from "../../helpers";
import { APP_COLOR_BLUE, EDIT_COLOR_GREEN } from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { FaLink } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import ReferralsBonusStatusAndEarnDate from "./ReferralBonusStatusAndEarnDate";

const ReferralsList = ({ referrals, cardholders, cardsByHolder }) => {
  return referrals.length === 0 ? (
    <EmptyList dataType={"referrals"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader">Referral For</th>
          <th className="tableHeader">Referral Date</th>
          <th className="tableHeader">Referrer</th>
          <th className="tableHeader">Referring Card</th>
          <th className="tableHeader">Referral Bonus</th>
          <th className="tableHeader">Referral Link | Edit | Delete</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {referrals.map((referral) => {
          const {
            id,
            referralFor,
            referrerId,
            referralLink,
            referringCardId,
            referralDate,
          } = referral;
          const cardsForReferrer = cardsByHolder[referrerId];
          const referringCard = cardsForReferrer.find(
            (card) => referringCardId === card.id
          );

          return (
            <tr key={id}>
              <td style={{ paddingRight: "15px" }}>
                <div
                  style={{
                    backgroundColor: referral.referralBonusEarned
                      ? EDIT_COLOR_GREEN
                      : APP_COLOR_BLUE,
                    borderRadius: "0 15px 15px 0",
                    padding: "5px 3px",
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  {
                    <BonusEarnStatusIcon
                      bonusEarned={referral.referralBonusEarned}
                      iconSize="2rem"
                      inverseColor
                    />
                  }
                  <p style={{ marginLeft: "5px" }}>{titleCase(referralFor)}</p>
                </div>
              </td>
              <td>{formatDate(referralDate)}</td>
              <td>
                {cardholders.find((holder) => holder.id === referrerId).name}
              </td>
              <td>
                <img
                  className="issuerLogos"
                  src={referringCard.issuer.img}
                  alt=""
                />{" "}
                {referringCard?.card}{" "}
                <Link to={`/card/${referringCard?.id}`}>
                  <FiExternalLink style={{ color: APP_COLOR_BLUE }} />
                </Link>
              </td>
              <td>
                <ReferralsBonusStatusAndEarnDate referral={referral} />
              </td>
              <td className="editDeleteCard">
                <a
                  href={referralLink}
                  target="_blank"
                  rel="noreferrer"
                  className={referralLink === "" && "linkDisabled"}
                >
                  <FaLink
                    id="referralLink"
                    style={{ color: referralLink === "" && "gray" }}
                  />
                </a>
                <ReferralAddEditModal referral={referral} />
                <ConfirmDeleteModal data={referral} dataType="referral" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ReferralsList.propTypes = {
  cardholders: PropTypes.array.isRequired,
};

export default ReferralsList;
