import React, { useContext, useEffect } from "react";
import CardHolderAddEditModal from "../cardholders/CardHolderAddEditModal";
import { useDispatch, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { useUser } from "reactfire";
import ReferralsList from "./ReferralsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { WindowWidthContext } from "../App";
// import CardholderCards from "../cardholders/CardholderCards";
import { calculateCurrentInquiries } from "../../helpers";

const ReferralsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cards = useSelector((state) => state.cards);
  const loyaltyData = useSelector((state) => state.loyaltyData);
  const referrals = useSelector((state) => state.referrals);

  useEffect(() => {
    if (referrals.length === 0 && status !== "loading") {
      dispatch(loadReferralsFromFirebase(user.uid));
    }
    if (cardholders.length === 0 && status !== "loading") {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadCardsFromFirebase(user.uid));
    }

    if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadloyaltyDataFromFirebase(user.uid));
    }
  }, [user]);

  const cardsByHolder = _.groupBy(cards, (o) => o.userId);
  const loyaltyByHolder = _.groupBy(loyaltyData, (o) => o.userId);
  const inquiriesByHolder = calculateCurrentInquiries(cardsByHolder);

  const cardholdersFinal = cardholders.map((holder) => {
    return {
      ...holder,
      hasCards: cardsByHolder.hasOwnProperty(holder.id),
      hasLoyalty: loyaltyByHolder.hasOwnProperty(holder.id),
    };
  });

  return (
    <div className="cardHoldersContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Holders</h2>
        <CardHolderAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : windowWidth > 950 ? (
        <ReferralsList
          cardholders={cardholdersFinal}
          cardsByHolder={cardsByHolder}
          loyaltyByHolder={loyaltyByHolder}
          inquiriesByHolder={inquiriesByHolder}
        />
      ) : (
        // <CardholderCards
        //   cardholders={cardholdersFinal}
        //   cardsByHolder={cardsByHolder}
        //   loyaltyByHolder={loyaltyByHolder}
        //   inquiriesByHolder={inquiriesByHolder}
        // />
        <div>Referrals Cards</div>
      )}
    </div>
  );
};

export default ReferralsPage;

/* 
THINGS TO DO
- Setup firebase functions for referrals
- Setup redux
- Code the components

*/
