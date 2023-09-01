import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  CARD_DATA_KEYS,
  APP_COLOR_BLACK_OPACITY,
  DELETE_MODAL_TYPES,
} from "../../constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import CardText from "./CardText";
import { setColorForCardStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
export default function CardListCards({ cards, showEditDelete, showUserName }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
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
            {showUserName && (
              <Card.Title
                style={{
                  padding: "10px 0 0 10px",
                  marginBottom: 0,
                  backgroundColor: cardTitleColor,
                  borderRadius: "5px 5px 0 0 ",
                }}
              >
                {card.cardholder}
              </Card.Title>
            )}
            <Card.Subtitle
              style={{
                padding: "10px",
                margin: "0",
                backgroundColor: cardTitleColor,
                borderRadius: showUserName ? null : "5px 5px 0 0 ",
                color: showUserName ? "rgba(33, 37, 41, 0.75)" : "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <p
                  style={{ margin: 0 }}
                >{`${card.issuer.name} ${card.card}`}</p>
                <p style={{ margin: 0 }}>
                  {card.signupBonus}{" "}
                  <BonusEarnStatusIcon
                    bonusEarned={card.bonusEarned}
                    iconSize="1.3rem"
                  />
                </p>
              </div>
            </Card.Subtitle>
          </div>
          <section id="cardBody" onClick={() => routeChange(card)}>
            <div>
              <CardText card={card} dataType={CARD_DATA_KEYS.appDate} />
              <CardText card={card} dataType={CARD_DATA_KEYS.creditLine} />
              <CardText card={card} dataType={CARD_DATA_KEYS.annualFee} />
              <CardText card={card} dataType={CARD_DATA_KEYS.nextFeeDate} />
              <CardText card={card} dataType={CARD_DATA_KEYS.bonusEarnDate} />
              <CardText card={card} dataType={CARD_DATA_KEYS.cardType} />
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
};
