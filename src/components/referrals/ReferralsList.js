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

const ReferralsList = ({
  referrals,
  // cardsByHolder,
  // loyaltyByHolder,
  // cardholders,
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
        {referrals.map((referral) => {
          return (
            <tr key={referral.id}>
              <td>{referral.referrer}</td>
              <td>{referral.referringCard}</td>
              <td>{referral.referralLink}</td>
              <td>{referral.referralBonus}</td>
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
