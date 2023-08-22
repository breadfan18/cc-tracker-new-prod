import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import CardTabs from "./CardTabs";
import { sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import CardAddEditModal from "./CardAddEditModal";
import { WindowWidthContext } from "../App";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";

const CardsPage = ({
  cards,
  loadCards,
  loading,
  cardholders,
  loadCardholdersFromFirebase,
}) => {
  const windowWidth = useContext(WindowWidthContext);
  const { status, data: user } = useUser();

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      loadCards(user.uid);
    }

    if (cardholders.length === 0 && user) {
      loadCardholdersFromFirebase(user.uid);
    }
  }, [status, user, cardholders]);

  return (
    <div className="cardsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Wallet</h2>
        <CardAddEditModal cardholders={cardholders} />
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

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: sortCardsByDate(state.cards),
    loading: state.apiCallsInProgress > 0,
    cardholders: state.cardholders,
  };
}

const mapDispatchToProps = {
  loadCards: loadCardsFromFirebase,
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
