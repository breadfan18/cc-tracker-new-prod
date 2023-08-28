import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import CardTabs from "./CardTabs";
import { sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import CardAddEditModal from "./CardAddEditModal";
import { WindowWidthContext } from "../App";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";

const CardsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) => state.cardholders);
  const cards = useSelector((state) => sortCardsByDate(state.cards));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadCardsFromFirebase(user.uid));
    }

    if (cardholders.length === 0 && user) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
  }, [status, user, cardholders]);

  return (
    <div className="cardsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Wallet</h2>
        <CardAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : windowWidth < 650 ? (
        <CardsByUserDropDown cards={cards} />
      ) : (
        <CardTabs cards={cards} />
      )}
    </div>
  );
};

export default CardsPage;
