import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  APP_COLOR_BLACK_OPACITY,
  DELETE_MODAL_TYPES,
  CARD_DATA_IN_CARD_VIEW,
} from "../../constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import CardText from "./CardText";
import { setColorForCardStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
export default function CardListCards({
  cards,
  showEditDelete,
  showUserName,
  showBonusInfo,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "20rem";
  const history = useHistory();

  const routeChange = (card) => {
    let path = `/card/${card.id}`;
    history.push(path);
  };

  const allCards = cards.map((card) => {
    const cardTitleColor = setColorForCardStatus("cardCard", card.status);
    return (
      <Card style={{ width: cardWidth }} key={card.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: APP_COLOR_BLACK_OPACITY,
            }}
          >
            <Card.Title
              className="cardCardTitle"
              style={{ backgroundColor: cardTitleColor }}
            >
              <div style={{ padding: "10px" }}>
                <p>{showUserName ? card.cardholder : card.issuer.name}</p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(33, 37, 41, 0.75)",
                  }}
                >
                  {!showUserName
                    ? card.card
                    : `${card.issuer.name} ${card.card}`}
                </p>
              </div>
              {showBonusInfo && (
                <BonusStatusAndEarnDate
                  card={card}
                  isCardTitle
                  isCard
                  iconSize="2rem"
                  inverseColor
                />
              )}
            </Card.Title>
          </div>
          <section id="cardBody" onClick={() => routeChange(card)}>
            <div>
              {Object.keys(CARD_DATA_IN_CARD_VIEW).map((key) => (
                <CardText card={card} dataType={key} />
              ))}
            </div>
            <div>
              <img src={card.issuer.img} alt="Issuer" className="issuerLogos" />
            </div>
          </section>
          {showEditDelete ?? (
            <div
              className="editDeleteCard editDeleteOnCards"
              style={{ backgroundColor: cardTitleColor }}
            >
              <CardAddEditModal card={card} />
              <ConfirmDeleteModal
                data={card}
                dataType={DELETE_MODAL_TYPES.card}
              />
            </div>
          )}
        </Card.Body>
      </Card>
    );
  });
  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

CardListCards.propTypes = {
  cards: PropTypes.array.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
  showBonusInfo: PropTypes.bool,
};
