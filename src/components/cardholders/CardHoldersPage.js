import React, { useEffect } from "react";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { connect, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { useUser } from "reactfire";
import CardholdersList from "./CardholdersList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";

const CardHoldersPage = ({
  loadCardholdersFromFirebase,
  loadCardsFromFirebase,
  loadloyaltyDataFromFirebase,
}) => {
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) => state.cardholders);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cards = useSelector((state) => state.cards);
  const loyaltyData = useSelector((state) => state.loyaltyData);

  useEffect(() => {
    if (cardholders.length === 0 && status !== "loading") {
      loadCardholdersFromFirebase(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      loadCardsFromFirebase(user.uid);
    }

    if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
      loadloyaltyDataFromFirebase(user.uid);
    }
  }, [cardholders]);

  const cardsByHolder = _.groupBy(cards, (o) => o.userId);
  const loyaltyByHolder = _.groupBy(loyaltyData, (o) => o.userId);

  const cardholdersFinal = cardholders.map((holder) => {
    return {
      ...holder,
      hasCards: cardsByHolder.hasOwnProperty(holder.id),
      hasLoyalty: loyaltyByHolder.hasOwnProperty(holder.id),
    };
  });

  return (
    <div className="cardHoldersContainer">
      <h2 className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Manage Card Holders</h2>
        <CardHolderAddEditModal />
      </h2>
      <p
        style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
          color: "gray",
        }}
      >
        NOTE - Card Holders with existing cards or loyalty accounts cannot be
        deleted. Please delete all their cards and/or loyalty accounts first.
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <CardholdersList cardholders={cardholdersFinal} />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  loadCardholdersFromFirebase,
  loadCardsFromFirebase,
  loadloyaltyDataFromFirebase,
};

export default connect(null, mapDispatchToProps)(CardHoldersPage);
