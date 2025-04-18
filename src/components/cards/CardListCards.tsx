import { Card as BootstrapCard } from "react-bootstrap";
import {
  APP_COLOR_BLACK_OPACITY,
  DELETE_MODAL_TYPES,
  CARD_DATA_IN_CARD_VIEW,
  DELETE_COLOR_RED,
  REMINDERS_TEXT_AF,
  REMINDERS_TEXT_BONUS,
} from "../../constants";
import EmptyList from "../common/EmptyList";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardText from "./CardText";
import { setColorForCardStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { getRemindersData } from "../../utils/reminderData";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import CardFavIcon from "./CardFavIcon";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";

type CardListCardsProps = {
  cards: Card[];
  showEditDelete: boolean;
  showUserName: boolean;
  showBonusInfo?: boolean;
};

export default function CardListCards({
  cards,
  showEditDelete,
  showUserName,
  showBonusInfo,
}: CardListCardsProps) {
  const history = useHistory();
  const theme = useSelector((state: MainReduxState) => state.theme);

  const routeChange = (card: Card) => {
    let path = `/card/${card.id}`;
    history.push(path);
  };

  const allCards = cards.map((card) => {
    const cardTitleColor = setColorForCardStatus("cardCard", card.status);
    const { isSpendByDateClose, spendDaysRemaining, showAnnualFeeDueIcon } =
      getRemindersData(card);
    return (
      <BootstrapCard
        key={card.id}
        className={`cardCard ${theme === "dark" && "bg-dark"}`}
      >
        <BootstrapCard.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: APP_COLOR_BLACK_OPACITY,
            }}
          >
            <BootstrapCard.Title
              className="cardCardTitle"
              style={{
                backgroundColor: cardTitleColor,
                borderBottom: theme === "dark" ? "1px solid #4e5359" : "",
              }}
            >
              <div style={{ padding: "10px" }}>
                <p>{showUserName ? card.cardholder : card.issuer.name}</p>
                <p
                  style={{
                    fontSize: "1rem",
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
                  isCard
                  iconSize="2rem"
                  inverseColor
                />
              )}
            </BootstrapCard.Title>
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
        </BootstrapCard.Body>
        <BootstrapCard.Footer
          className="cardsCardFooter"
          style={{ borderTop: theme === "dark" ? "1px solid #4e5359" : "" }}
        >
          <div>
            {showAnnualFeeDueIcon && (
              <TbAlertOctagonFilled
                style={{
                  color: DELETE_COLOR_RED,
                  fontSize: "1.5rem",
                  marginRight: "5px",
                }}
                title={REMINDERS_TEXT_AF}
              />
            )}
            {(card.spendBy && spendDaysRemaining && isSpendByDateClose) ||
              (spendDaysRemaining && spendDaysRemaining < 0 && (
                <BsFillBellFill
                  style={{
                    color: "orange",
                    fontSize: "1.5rem",
                    marginRight: "5px",
                  }}
                  title={REMINDERS_TEXT_BONUS}
                />
              ))}
          </div>
          {showEditDelete && (
            <div className="editDeleteCard">
              <CardFavIcon card={card} />
              <CardAddEditModal card={card} />
              <ConfirmDeleteModal
                data={card}
                dataType={DELETE_MODAL_TYPES.card}
              />
            </div>
          )}
        </BootstrapCard.Footer>
      </BootstrapCard>
    );
  });
  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}
