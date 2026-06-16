import { useState } from "react";
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
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
} from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { getRemindersData } from "../../utils/reminderData";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import {
  BsCalendar3,
  BsCheckCircleFill,
  BsClock,
  BsCreditCard,
} from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CardFavIcon from "./CardFavIcon";
import { useSelector } from "react-redux";
import IssuerLogo from "./IssuerLogo";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";

type CardListCardsProps = {
  cards: Card[];
  showEditDelete: boolean;
  showUserName: boolean;
  showBonusInfo?: boolean;
  expandableLayout?: boolean;
};

export default function CardListCards({
  cards,
  showEditDelete,
  showUserName,
  showBonusInfo,
  expandableLayout,
}: CardListCardsProps) {
  const history = useHistory();
  const theme = useSelector((state: MainReduxState) => state.theme);
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);

  const routeChange = (card: Card) => {
    let path = `/card/${card.id}`;
    history.push(path);
  };

  const toggleExpanded = (cardId: string) => {
    setExpandedCardIds((currentIds) =>
      currentIds.includes(cardId)
        ? currentIds.filter((id) => id !== cardId)
        : [...currentIds, cardId],
    );
  };

  const formatDisplayDate = (dateStr: string) => {
    const normalizedDate = dateStr?.trim();
    if (!normalizedDate) return "N/A";

    const [year, month, day] = normalizedDate.split("-").map(Number);
    if (!year || !month || !day) return formatDate(normalizedDate);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  };

  const renderBonusBadge = (card: Card) => {
    const noBonus = card.signupBonus === undefined || card.signupBonus === "0";
    const hasBonusEarnDate =
      card.bonusEarnDate?.includes("-") || card.bonusEarned;
    const badgeClass = hasBonusEarnDate
      ? "earned"
      : noBonus
        ? "none"
        : "pending";

    return (
      <div className={`walletBonusBadge ${badgeClass}`}>
        {hasBonusEarnDate ? <BsCheckCircleFill /> : <BsClock />}
        <div>
          <strong>{noBonus ? "N/A" : card.signupBonus}</strong>
          <span>
            {hasBonusEarnDate
              ? formatDisplayDate(card.bonusEarnDate)
              : noBonus
                ? "No Bonus"
                : "Pending"}
          </span>
        </div>
      </div>
    );
  };

  const triggerWalletAction = (actionElement: HTMLElement) => {
    const control = actionElement.querySelector<HTMLElement>("button, .heart");
    control?.click();
  };

  const handleWalletActionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button, .heart")) return;

    triggerWalletAction(event.currentTarget);
  };

  const handleWalletActionKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    triggerWalletAction(event.currentTarget);
  };

  const renderWalletCard = (card: Card) => {
    const hasBonusEarnDate =
      card.bonusEarnDate?.includes("-") || card.bonusEarned;
    const cardStatusColor =
      card.status === "closed"
        ? "#dc3545"
        : card.status === "downgraded"
          ? "#f0ad4e"
          : hasBonusEarnDate
            ? "#198754"
            : "#6b58e5";
    const isExpanded = expandedCardIds.includes(card.id);

    return (
      <BootstrapCard
        key={card.id}
        className={`cardCard walletCard ${theme === "dark" && "bg-dark"}`}
        style={
          { "--wallet-card-accent": cardStatusColor } as React.CSSProperties
        }
      >
        <BootstrapCard.Body className="walletCardBody">
          <section className="walletCardSummary">
            <button
              type="button"
              className="walletCardExpandButton"
              onClick={() => toggleExpanded(card.id)}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${card.card}`}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <button
              type="button"
              className="walletCardTitleButton"
              onClick={() => routeChange(card)}
            >
              <strong>
                {card.issuer.name} {card.card}
              </strong>
              <span>{card.cardholder}</span>
            </button>
            {showBonusInfo && renderBonusBadge(card)}
          </section>

          <section className="walletCardStats">
            <div>
              <BsCalendar3 />
              <span>
                <small>App Date</small>
                {formatDisplayDate(card.appDate)}
              </span>
            </div>
            <div>
              <BsCreditCard />
              <span>
                <small>Annual Fee</small>
                {formatCurrency(card.annualFee)}
              </span>
            </div>
            <div>
              <BsClock />
              <span>
                <small>Next Fee Date</small>
                {card.nextFeeDate ? formatDisplayDate(card.nextFeeDate) : "N/A"}
              </span>
            </div>
          </section>

          {isExpanded && (
            <>
              <section className="walletCardDetails">
                <div>
                  <small>Credit Line</small>
                  {formatCurrency(card.creditLine)}
                </div>
                <div>
                  <small>Card Type</small>
                  {card.cardType}
                </div>
                <div>
                  <small>Issuer</small>
                  {card.issuer.name}
                </div>
                <IssuerLogo issuer={card.issuer} alt={card.issuer.name} />
              </section>
              <section
                className="walletCardActions"
                onClick={(event) => event.stopPropagation()}
              >
                {showEditDelete && (
                  <>
                    <div
                      className="walletAction walletFavoriteAction"
                      role="button"
                      tabIndex={0}
                      onClick={handleWalletActionClick}
                      onKeyDown={handleWalletActionKeyDown}
                      aria-label={`${card.isFav ? "Remove from" : "Add to"} Favorites`}
                    >
                      <CardFavIcon card={card} />
                      <span>Favorite</span>
                    </div>
                    <div
                      className="walletAction"
                      role="button"
                      tabIndex={0}
                      onClick={handleWalletActionClick}
                      onKeyDown={handleWalletActionKeyDown}
                      aria-label={`Edit ${card.card}`}
                    >
                      <CardAddEditModal card={card} />
                      <span>Edit</span>
                    </div>
                    <div
                      className="walletAction walletDeleteAction"
                      role="button"
                      tabIndex={0}
                      onClick={handleWalletActionClick}
                      onKeyDown={handleWalletActionKeyDown}
                      aria-label={`Delete ${card.card}`}
                    >
                      <ConfirmDeleteModal
                        data={card}
                        dataType={DELETE_MODAL_TYPES.card}
                      />
                      <span>Delete</span>
                    </div>
                  </>
                )}
              </section>
            </>
          )}
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  };

  const allCards = cards.map((card) => {
    if (expandableLayout) return renderWalletCard(card);

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
              <IssuerLogo issuer={card.issuer} alt={card.issuer.name} />
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
    <div
      id="cardCardContainer"
      className={expandableLayout ? "expandableCardList" : undefined}
    >
      {allCards}
    </div>
  );
}
