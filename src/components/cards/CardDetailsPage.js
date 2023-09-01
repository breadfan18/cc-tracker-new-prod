import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadCardsFromFirebase,
  saveCardToFirebase,
} from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import {
  NEW_CARD,
  APP_COLOR_BLUE,
  APP_COLOR_LIGHT_BLUE,
  DELETE_MODAL_TYPES,
} from "../../constants";
import { Card, Table } from "react-bootstrap";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
  sortNotesByDate,
  titleCase,
} from "../../helpers";
import CardNotes from "./CardNotes";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import { CardReminderContainer } from "./CardReminderContainer";
import CreditBureauIcons from "../common/CreditBureauIcons";
import { useUser } from "reactfire";
function CardDetailsPage({ cards, loadCardsFromFirebase, loading, ...props }) {
  const [card, setCard] = useState({ ...props.card });
  const windowWidth = useContext(WindowWidthContext);
  const { status, data: user } = useUser();
  console.log(status);

  useEffect(() => {
    if (cards.length === 0 && status === "success") {
      loadCardsFromFirebase(user?.uid);
    } else {
      // Need to understand this logic..
      setCard({ ...props.card });
    }
  }, [props.card, user]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
        <div className="editDeleteCard">
          <CardAddEditModal card={props.card} />
          <ConfirmDeleteModal
            data={card}
            dataType={DELETE_MODAL_TYPES.card}
            redirect={true}
          />
        </div>
      </section>
      <div className="cardDetailsBody">
        <Card
          style={{
            width: windowWidth > 800 ? "30rem" : windowWidth,
            backgroundColor: setColorForCardStatus("cardCard", card.status),
            marginRight: windowWidth > 800 ? "15px" : null,
            marginBottom: windowWidth > 800 ? null : "15px",
            boxShadow:
              card.status === "open"
                ? "2px 0 10px gray"
                : `2px 0 15px ${setColorForCardStatus(
                    "cardCard",
                    card.status
                  )}`,
          }}
        >
          <Card.Img
            variant="top"
            src={card.issuer.img}
            style={{
              padding: "2rem",
              backgroundColor: APP_COLOR_LIGHT_BLUE,
              maxHeight: "10rem",
              objectFit: "contain",
            }}
          />
          <Card.Body>
            <article
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Card.Title style={{ fontSize: "clamp(0.9rem, 5vw, 1.5rem)" }}>
                  {card.issuer.name} {card.card}
                </Card.Title>
                <Card.Title style={{ fontSize: "clamp(0.7rem, 4vw, 1rem)" }}>
                  {card.cardholder}
                </Card.Title>
              </div>
              <div>
                <BonusEarnStatusIcon
                  bonusEarned={card.bonusEarned}
                  iconSize="clamp(1.5rem, 10vw, 3rem)"
                />
              </div>
            </article>
            <Table className={setColorForCardStatus("cardTable", card.status)}>
              <tbody className="align-middle">
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    App Date:
                  </td>
                  <td>{formatDate(props.card.appDate)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Card Type:
                  </td>
                  <td>{card.cardType}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Annual Fee:
                  </td>
                  <td>{formatCurrency(card.annualFee)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Next Fee Date:
                  </td>
                  <td>
                    {props.card.nextFeeDate !== ""
                      ? formatDate(props.card.nextFeeDate)
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Credit Line:
                  </td>
                  <td>{formatCurrency(card.creditLine)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Inquiries:
                  </td>
                  <td>{<CreditBureauIcons inquiries={card.inquiries} />}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Signup Bonus:
                  </td>
                  <td>{card.signupBonus}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Spend Requirement:
                  </td>
                  <td>{formatCurrency(card.spendReq)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Spend By:
                  </td>
                  <td>
                    {props.card.spendBy !== ""
                      ? formatDate(props.card.spendBy)
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Card Status:
                  </td>
                  <td>{titleCase(props.card.status)}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div id="cardDetailsSectionRight">
          <CardNotes
            cardId={card.id}
            cardNotes={sortNotesByDate(_.values(card.cardNotes))}
          />
          <CardReminderContainer card={card} />
        </div>
      </div>
    </div>
  );
}

CardDetailsPage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  loadCardsFromFirebase: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getCardById(cards, id) {
  return cards.find((card) => card.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;

  const card =
    id && state.cards.length > 0 ? getCardById(state.cards, id) : NEW_CARD;

  console.log(card);
  return {
    card,
    cards: state.cards,
    loading: state.apiCallsInProgress > 0 || state.cards.length === 0,
  };
}

const mapDispatchToProps = {
  loadCardsFromFirebase,
  saveCardToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsPage);
