import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardholderAddEditModal from "./CardHolderAddEditModal";
import CardsDataMiniTable from "./CardsDataMiniTable";
import LoyaltyDataMiniTable from "./LoyaltyDataMiniTable";
import CardholderPhoto from "./CardholderPhoto";

export default function CardholderCards({
  cardholders,
  cardsByHolder,
  loyaltyByHolder,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18em";
  const allCardholders = cardholders.map((holder) => {
    const cardsForThisHolder = cardsByHolder[holder.id];
    const loyaltyForThisHolder = loyaltyByHolder[holder.id];

    return (
      <Card
        style={{ width: cardWidth }}
        key={holder.id}
        className="cardCard cardholderCard"
      >
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Title className="mb-0 cardholderCardTitle">
              <CardholderPhoto
                img={holder.img}
                heightAndWidth="6rem"
                imgOnCard={true}
              />
            </Card.Title>
          </div>
          <section id="cardholderCardBody">
            <h6 id="cardholderCardName">
              {holder.name} {holder.isPrimary && "(Primary)"}
            </h6>
            <article style={{ textAlign: "center" }}>
              <b>Cards</b>
              <div>
                <CardsDataMiniTable cards={cardsForThisHolder} />
              </div>
            </article>
            <br />
            <article style={{ textAlign: "center" }}>
              <b>Loyalty</b>
              <div>
                <LoyaltyDataMiniTable loyaltyData={loyaltyForThisHolder} />
              </div>
            </article>
          </section>

          <div className="editDeleteCard editDeleteOnCards cardholderFooter">
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
