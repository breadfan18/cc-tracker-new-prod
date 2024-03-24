import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { Spinner } from "../common/Spinner";
import {
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
import { CardReminderContainer } from "./CardReminderContainer";
import CreditBureauIcons from "../common/CreditBureauIcons";
import { useUser } from "reactfire";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import CardReferrals from "./CardReferrals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function CardDetailsPage() {
  const { id } = useParams();
  const cards = useSelector((state) => state.cards);
  const card = getCardById(cards, id);
  const windowWidth = useContext(WindowWidthContext);
  const { status, data: user } = useUser();
  const referrals = useSelector((state) => state.referrals);
  const referralsForThisCard = referrals.filter(
    (referral) => referral.referringCardId === card.id
  );
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.apiCallsInProgress > 0 || state.cards.length === 0
  );

  useEffect(() => {
    if (cards.length === 0 && status === "success") {
      dispatch(loadCardsFromFirebase(user?.uid));
    } else if (referrals.length === 0 && status === "success") {
      dispatch(loadReferralsFromFirebase(user?.uid));
    }
  }, [card, user, referrals]);

  function getCardById(cards, id) {
    return cards?.find((card) => card.id === id) || null;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
        <div className="editDeleteCard">
          <CardAddEditModal card={card} />
          <ConfirmDeleteModal
            data={card}
            dataType={DELETE_MODAL_TYPES.card}
            redirect={true}
          />
        </div>
      </section>
      <div
        className="cardDetailsBody"
        style={{ padding: windowWidth < 800 && "0 10px" }}
      >
        <Card
          id="cardDetailsCard"
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
          <article className="cardDetailsHeaderContainer">
            <div style={{ padding: "10px 16px" }}>
              <Card.Title style={{ fontSize: "clamp(0.9rem, 5vw, 1.5rem)" }}>
                {card.issuer.name} {card.card}
              </Card.Title>
              <Card.Title style={{ fontSize: "clamp(0.7rem, 4vw, 1rem)" }}>
                {card.cardholder}
              </Card.Title>
            </div>
            <BonusStatusAndEarnDate
              card={card}
              isCard
              inverseColor
              iconSize="clamp(1.5rem, 10vw, 3rem)"
              isCardDetailsPage
            />
          </article>
          <Card.Body>
            <Table className={setColorForCardStatus("cardTable", card.status)}>
              <tbody className="align-middle">
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    App Date:
                  </td>
                  <td>{formatDate(card.appDate)}</td>
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
                    {card.nextFeeDate !== ""
                      ? formatDate(card.nextFeeDate)
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
                    {card.spendBy !== "" ? formatDate(card.spendBy) : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_BLUE }}
                    className="cardDetailsFieldHeaders"
                  >
                    Card Status:
                  </td>
                  <td>{titleCase(card.status)}</td>
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
          {referralsForThisCard.length > 0 && (
            <CardReferrals cardReferrals={referralsForThisCard} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetailsPage;
