import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import CardTabs from "./CardTabs";
import { addUserNameToCard, sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import CardAddEditModal from "./CardAddEditModal";
import { WindowWidthContext } from "../App";

const CardsPage = ({ cards, loadCards, loading }) => {
  const windowWidth = useContext(WindowWidthContext);

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

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

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const cards = sortCardsByDate(state.cards).map((card) =>
    addUserNameToCard(card)
  );
  return {
    cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards: loadCardsFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
