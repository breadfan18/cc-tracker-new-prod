import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { Spinner } from "../common/Spinner";
import {
  DELETE_COLOR_RED,
  DELETE_MODAL_TYPES,
  NOTIFICATIONS_AF_DATA_TYPE,
} from "../../constants";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { sortNotesByDate } from "../../helpers";
import CardNotes from "./CardNotes";
import _ from "lodash";
import { useUser } from "reactfire";
import CardReferrals from "./CardReferrals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardDetailsInfo from "./CardDetailsInfo";
import useWindhowWidth from "../../hooks/windowWidth";
import CardFavIcon from "./CardFavIcon";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { CardDetailsNotification } from "../common/Notifications/CardDetailsNotifications";

function CardDetailsPage() {
  const { id } = useParams();
  const cards = useSelector((state) => state.cards);
  const card = getCardById(cards, id);
  const { status, data: user } = useUser();
  const referrals = useSelector((state) => state.referrals);
  const referralsForThisCard = referrals.filter(
    (referral) => referral.referringCardId === card.id
  );
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.apiCallsInProgress > 0 || state.cards.length === 0
  );

  const notifications = useSelector((state) => state.notifications);

  const cardNotfications = notifications.filter(
    (notifications) => notifications.cardId === card?.id
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
  const { windowWidth, isTablet, isMobile } = useWindhowWidth();

  const cardNotificationElements = cardNotfications.map(
    (notification, index) => {
      return (
        <CardDetailsNotification
          notification={notification}
          Icon={
            notification.notificationType === NOTIFICATIONS_AF_DATA_TYPE
              ? TbAlertOctagonFilled
              : BsFillBellFill
          }
          iconColor={
            notification.notificationType === NOTIFICATIONS_AF_DATA_TYPE
              ? DELETE_COLOR_RED
              : "orange"
          }
          lastReminder={index === cardNotfications.length - 1 ? true : false}
          firebaseUid={user?.uid}
        />
      );
    }
  );
  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
        <div className="editDeleteCard">
          <CardFavIcon card={card} firebaseUid={user?.uid} />
          <CardAddEditModal card={card} />
          <ConfirmDeleteModal
            data={card}
            dataType={DELETE_MODAL_TYPES.card}
            redirect={true}
          />
        </div>
      </section>
      {cardNotfications.length > 0 && (
        <section className="card-details-notifications-container">
          {cardNotificationElements}
        </section>
      )}
      <div
        className={`cardDetailsBody ${isTablet && "cardDetailsBodyTablet"} ${
          isMobile && "cardDetailsBodyMobile"
        }`}
      >
        <CardDetailsInfo
          windowWidth={windowWidth}
          card={card}
          isTablet={isTablet}
          isMobile={isMobile}
        />
        <div id="cardDetailsSectionRight">
          <section className={`${isTablet && "cardDetailsSectionRightTablet"}`}>
            <CardNotes
              cardId={card.id}
              cardNotes={sortNotesByDate(_.values(card.cardNotes))}
            />
          </section>
          {referralsForThisCard.length > 0 && (
            <CardReferrals
              cardReferrals={referralsForThisCard}
              windowWidth={windowWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetailsPage;
