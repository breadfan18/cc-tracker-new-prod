import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardHolderAddEditModal from "../cardholders/CardHolderAddEditModal";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardsDataMiniTable from "../cardholders/CardsDataMiniTable";
import LoyaltyDataMiniTable from "../cardholders/LoyaltyDataMiniTable";
import CardholderPhoto from "../cardholders/CardholderPhoto";
import InquiriesMiniTable from "../cardholders/InquiriesMiniTable";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ReferralsList = ({
  referrals,
  cardholders,
  cardsByHolder,
  // loyaltyByHolder,
  // inquiriesByHolder,
}) => {
  return referrals.length === 0 ? (
    <EmptyList dataType={"referrals"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader">Referrer</th>
          <th className="tableHeader">Referring Card</th>
          <th className="tableHeader">Referral Link</th>
          <th className="tableHeader">Referral Bonus</th>
          <th className="tableHeader"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {referrals.map(
          ({
            id,
            referrerId,
            referralLink,
            referralBonus,
            referringCardId,
          }) => {
            const cardsForReferrer = cardsByHolder[referrerId];

            console.log(cardsForReferrer);
            const referringCard = cardsForReferrer.find(
              (card) => referringCardId === card.id
            );

            console.log(referringCard);
            return (
              <tr key={id}>
                <td>
                  {cardholders.find((holder) => holder.id === referrerId).name}
                </td>
                <td>
                  <img
                    className="issuerLogos"
                    src={referringCard.issuer.img}
                    alt=""
                  />{" "}
                  <Link to={`/card/${referringCard?.id}`}>
                    {referringCard?.card}
                  </Link>
                </td>
                <td>{referralLink}</td>
                <td>{referralBonus}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
};

ReferralsList.propTypes = {
  cardholders: PropTypes.array.isRequired,
};

export default ReferralsList;
