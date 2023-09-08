import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardholderAddEditModal from "./CardHolderAddEditModal";
import CardsDataMiniTable from "./CardsDataMiniTable";
import LoyaltyDataMiniTable from "./LoyaltyDataMiniTable";

export default function CardholderCards({
  cardholders,
  cardsByHolder,
  loyaltyByHolder,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 758 ? windowWidth : "22em";
  const allCardholders = cardholders.map((holder) => {
    const cardsForThisHolder = cardsByHolder[holder.id];
    const loyaltyForThisHolder = loyaltyByHolder[holder.id];

    const imgClass =
      windowWidth > 758
        ? "smallImg"
        : windowWidth < 758 && windowWidth >= 450
        ? "largeImg"
        : "smallImg";

    return (
      <Card style={{ width: cardWidth }} key={holder.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Title
              className="mb-0"
              style={{
                padding: "15px 0 15px 10px",
                borderRadius: "10px",
                margin: "0",
                textDecoration: "bold",
              }}
            >
              {holder.name} {holder.isPrimary && "(Primary)"}
            </Card.Title>
          </div>
          <section id="cardholderCardBody">
            <div style={{ flex: 1 }}>
              <article>
                <b style={{ color: "black", marginLeft: "4px" }}>Cards</b>
                <div>
                  <CardsDataMiniTable cards={cardsForThisHolder} />
                </div>
              </article>
              <br />
              <article>
                <b style={{ color: "black", marginLeft: "4px" }}>Loyalty</b>
                <div>
                  <LoyaltyDataMiniTable loyaltyData={loyaltyForThisHolder} />
                </div>
              </article>
            </div>
            <img
              src={holder.img || "https://i.imgur.com/JFgA7EB.png"}
              alt="AA"
              className={imgClass}
            />
          </section>

          <div className="editDeleteCard editDeleteOnCards">
            <CardholderAddEditModal
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
          </div>
        </Card.Body>
      </Card>
    );
  });
  return <div id="cardCardContainer">{allCardholders}</div>;
}

CardholderCards.propTypes = {
  cardholders: PropTypes.array.isRequired,
  cardsByHolder: PropTypes.object.isRequired,
  loyaltyByHolder: PropTypes.object.isRequired,
};