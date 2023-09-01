import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardholderAddEditModal from "./CardHolderAddEditModal";

export default function CardholderCards({
  cardholders,
  cardsByHolder,
  loyaltyByHolder,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCardholders = cardholders.map((holder) => {
    return (
      <Card style={{ width: cardWidth }} key={holder.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Subtitle
              className="mb-0 text-muted"
              style={{
                padding: "10px 0 10px 10px",
                borderRadius: "10px",
                margin: "0",
                textDecoration: "bold",
              }}
            >
              {holder.name} {holder.isPrimary && "(Primary)"}
            </Card.Subtitle>
          </div>
          <section id="cardholderCardBody">
            <div>
              <p className="mb-0 text-muted">
                <small>
                  <b style={{ color: "black" }}>Cards</b>
                  {": "}
                  {cardsByHolder[holder.id]?.length || 0}
                </small>
              </p>
              <p className="mb-0 text-muted">
                <small>
                  <b style={{ color: "black" }}>Loyalty</b>
                  {": "}
                  {loyaltyByHolder[holder.id]?.length || 0}
                </small>
              </p>
            </div>
            <img
              src={holder.img || "https://i.imgur.com/JFgA7EB.png"}
              alt="AA"
              style={{
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                border: "2px solid gray",
              }}
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
  return cardholders.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCardholders}</div>
  );
}

CardholderCards.propTypes = {
  cardholders: PropTypes.array.isRequired,
  cardsByHolder: PropTypes.object.isRequired,
  loyaltyByHolder: PropTypes.object.isRequired,
};
