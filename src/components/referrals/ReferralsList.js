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
  cardsByHolder,
  loyaltyByHolder,
  cardholders,
  inquiriesByHolder,
}) => {
  return cardholders.length === 0 ? (
    <EmptyList dataType={"card holders"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader"></th>
          <th className="tableHeader">Referrer</th>
          <th className="tableHeader">Referring Card</th>
          <th className="tableHeader">Referral Link</th>
          <th className="tableHeader">Referral Bonus</th>
          {/* <th className="tableHeader">Inquiries (24 mos)</th> */}
          <th className="tableHeader"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {cardholders.map((holder) => {
          const cardsForThisHolder = cardsByHolder[holder.id];
          const loyaltyForThisHolder = loyaltyByHolder[holder.id];
          const inquiriesForThisHolder = inquiriesByHolder[holder.id];

          return (
            <tr key={holder.id}>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <CardholderPhoto img={holder.img} heightAndWidth="4rem" />
              </td>
              <td>{holder.name.split(" ")[0]}</td>
              <td>{holder.name.split(" ")[1]}</td>
              <td className="dataTableTd">
                <CardsDataMiniTable cards={cardsForThisHolder} layout="list" />
              </td>
              <td className="dataTableTd">
                <LoyaltyDataMiniTable
                  loyaltyData={loyaltyForThisHolder}
                  layout="list"
                />
              </td>
              <td className="dataTableTd">
                <InquiriesMiniTable
                  inquiries={inquiriesForThisHolder}
                  layout="list"
                />
              </td>
              <td className="editDeleteCard">
                <CardHolderAddEditModal
                  cardholder={holder}
                  disableBtn={holder.isPrimary}
                />
                <ConfirmDeleteModal
                  data={holder}
                  dataType={DELETE_MODAL_TYPES.cardholder}
                  disableBtn={
                    holder.hasCards || holder.hasLoyalty || holder.isPrimary
                  }
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
  cardholders: PropTypes.array.isRequired,
};

export default ReferralsList;
