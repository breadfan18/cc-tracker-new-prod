import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { Spinner } from "../common/Spinner";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { sortNotesByDate } from "../../helpers";
import CardNotes from "./CardNotes";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import { CardReminderContainer } from "./CardReminderContainer";
import { useUser } from "reactfire";
import CardReferrals from "./CardReferrals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardDetailsInfo from "./CardDetailsInfo";

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
        <CardDetailsInfo windowWidth={windowWidth} card={card} />
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
