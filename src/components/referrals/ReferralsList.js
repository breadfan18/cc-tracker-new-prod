import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ReferralAddEditModal from "./ReferralAddEditModal";
import { formatDate } from "../../helpers";
import { APP_COLOR_BLUE, DELETE_MODAL_TYPES } from "../../constants";
import { FaLink } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import ReferralsBonusStatusAndEarnDate from "./ReferralBonusStatusAndEarnDate";
import ReferrerField from "./ReferralForField";
import { getReferralData } from "../../hooks/referralsData";

const ReferralsList = ({ referrals, cardsByHolder }) => {
  return referrals.length === 0 ? (
    <EmptyList dataType={"referrals"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader">Referrer</th>
          <th className="tableHeader">Referral Date</th>
          <th className="tableHeader">Referring Card</th>
          <th className="tableHeader">Referral For</th>
          <th className="tableHeader">Referred Card</th>
          <th className="tableHeader">Referral Bonus</th>
          <th className="tableHeader">Referral Link | Edit | Delete</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {referrals.map((referral) => {
          const {
            id,
            referredCard,
            referralLink,
            referralDate,
            issuer,
            referringCard,
            referringCardholder,
            referralBonusEarned,
            referralFor,
          } = getReferralData(referral, cardsByHolder);

          return (
            <tr key={id}>
              <td style={{ paddingRight: "15px" }}>
                <ReferrerField
                  referralBonusEarned={referralBonusEarned}
                  referringCardholder={referringCardholder}
                />
              </td>
              <td>{formatDate(referralDate)}</td>
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
              <td>{referralFor}</td>
              <td>
                {!referredCard || referredCard === "" ? (
                  "Unknown"
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="issuerLogos"
                      src={issuer.img}
                      alt=""
                      style={{ marginRight: "4px" }}
                    />
                    <p>{referredCard}</p>
                  </div>
                )}
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
                <ConfirmDeleteModal
                  data={referral}
                  dataType={DELETE_MODAL_TYPES.referral}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ReferralsList.propTypes = {
  referrals: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
  cardsByHolder: PropTypes.object.isRequired,
};

export default ReferralsList;
