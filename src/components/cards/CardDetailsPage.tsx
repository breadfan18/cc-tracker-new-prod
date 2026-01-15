import { useEffect } from "react";
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
import CardReferrals from "./CardDetailsReferrals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardDetailsInfo from "./CardDetailsInfo";
import useWindhowWidth from "../../hooks/windowWidth";
import CardFavIcon from "./CardFavIcon";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { PageNotifications } from "../common/Notifications/PageNotifications";
import RewardTags from "./reward-tags/RewardTags";
import { MainReduxState } from "../../types/redux";

function CardDetailsPage() {
  const { id } = useParams();
  const cards = useSelector((state: MainReduxState) => state.cards);
  const card = getCardById(cards, id);
  const { status, data: user } = useUser();
  const referrals = useSelector((state: MainReduxState) => state.referrals);
  const referralsForThisCard = card
    ? referrals.filter((referral) => referral.referringCardId === card.id)
    : [];
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: MainReduxState) => state.notifications
  );
  const loading = useSelector((state: MainReduxState) =>
    Boolean(
      state.loading?.cards ||
        state.loading?.referrals ||
        state.loading?.notifications
    )
  );
  const cardNotfications = card
    ? notifications.filter((notification) => notification.cardId === card.id)
    : [];

  useEffect(() => {
    if (status === "success") {
      if (cards.length === 0) {
        dispatch(loadCardsFromFirebase(user?.uid));
      }
      if (referrals.length === 0) {
        dispatch(loadReferralsFromFirebase(user?.uid));
      }
    }
  }, [cards.length, referrals.length, dispatch, status, user]);

  function getCardById(cards, id) {
    return cards?.find((card) => card.id === id) || null;
  }
  const { windowWidth, isTablet, isMobile, isDesktop } = useWindhowWidth();

  const cardNotificationElements = cardNotfications.map(
    (notification, index) => {
      return (
        <PageNotifications
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

  if (loading) {
    return <Spinner />;
  }

  const shouldRenderDetailsPage = !loading && cards.length > 0 && card;

  return shouldRenderDetailsPage ? (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
        <div className="editDeleteCard">
          <CardFavIcon card={card} />
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
        className={`${isDesktop && "cardDetailsBody"} ${
          isTablet && "cardDetailsBody cardDetailsBodyTablet"
        } ${isMobile && "cardDetailsBodyMobile"}`}
      >
        <CardDetailsInfo
          windowWidth={windowWidth}
          card={card}
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
          <RewardTags
            tags={_.values(card.tags)}
            cardId={id}
            firebaseUid={user?.uid}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="cardNotFoundContainer">
      <h2>Card not found</h2>
      <p>The card you are looking for does not exist.</p>
    </div>
  );
}

export default CardDetailsPage;
