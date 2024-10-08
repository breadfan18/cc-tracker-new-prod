import React, { useEffect } from "react";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { useDispatch, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { useUser } from "reactfire";
import CardholdersList from "./CardholdersList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import CardholderCards from "./CardholderCards";
import { calculateCurrentInquiries } from "../../helpers";
import useWindhowWidth from "../../hooks/windowWidth";

const CardHoldersPage = () => {
  const { isDesktop } = useWindhowWidth();
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cards = useSelector((state) => state.cards);
  const loyaltyData = useSelector((state) => state.loyaltyData);

  useEffect(() => {
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
      <p
        style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
          color: "gray",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      >
        NOTE - Card Holders with existing cards or loyalty accounts cannot be
        deleted. Please delete all their cards and/or loyalty accounts first.
      </p>
      {loading ? (
        <Spinner />
      ) : isDesktop ? (
        <CardholdersList
          cardholders={cardholdersFinal}
          cardsByHolder={cardsByHolder}
          loyaltyByHolder={loyaltyByHolder}
          inquiriesByHolder={inquiriesByHolder}
        />
      ) : (
        <CardholderCards
          cardholders={cardholdersFinal}
          cardsByHolder={cardsByHolder}
          loyaltyByHolder={loyaltyByHolder}
          inquiriesByHolder={inquiriesByHolder}
        />
      )}
    </div>
  );
};

export default CardHoldersPage;
