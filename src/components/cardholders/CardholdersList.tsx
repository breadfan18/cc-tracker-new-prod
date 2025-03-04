import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardsDataMiniTable from "./CardsDataMiniTable";
import LoyaltyDataMiniTable from "./LoyaltyDataMiniTable";
import CardholderPhoto from "./CardholderPhoto";
import InquiriesMiniTable from "./InquiriesMiniTable";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";

const CardholdersList = ({
  cardsByHolder,
  loyaltyByHolder,
  cardholders,
  inquiriesByHolder,
}) => {
  const theme = useSelector((state: MainReduxState) => state.theme);

  return cardholders.length === 0 ? (
    <EmptyList dataType={"card holders"} />
  ) : (
    <Table size="sm" variant={theme === "dark" ? "dark" : ""}>
      <thead>
        <tr>
          <th className="tableHeader"></th>
          <th className="tableHeader">First Name</th>
          <th className="tableHeader">Last Name</th>
          <th className="tableHeader">Cards</th>
          <th className="tableHeader">Loyalty</th>
          <th className="tableHeader">Inquiries (24 mos)</th>
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
                  isNewCardholder={false}
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

CardholdersList.propTypes = {
  cardholders: PropTypes.array.isRequired,
};

export default CardholdersList;
