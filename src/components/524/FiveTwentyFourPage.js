import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import {
  pipe,
  sortCardsByDate,
  wasCardOpenedWithinLast24Months,
} from "../../helpers";
import FiveTwentyFourAccordion from "./FiveTwentyFourAccordion";
import SelectInput from "../common/SelectInput";
import CardList from "../cards/CardListTable";
import { WindowWidthContext } from "../App";
import CardListCards from "../cards/CardListCards";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";

const FiveTwentyFourPage = ({
  cards,
  loadCards,
  loading,
  cardsByHolder,
  cardholders,
  loadCardholdersFromFirebase,
}) => {
  const windowWidth = useContext(WindowWidthContext);
  const [selectedCardHolder, setSelectedCardholder] = useState();
  const { status, data: user } = useUser();

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      loadCards(user.uid);
    }

    if (cardholders.length === 0 && user) {
      loadCardholdersFromFirebase(user.uid);
    }
  }, [status, user, cardholders]);

  const handleChange = (e) => setSelectedCardholder(e.target.value);

  const cardholdersToDisplay =
    selectedCardHolder === undefined || selectedCardHolder === ""
      ? cardholders.map((holder) => holder.id)
      : [selectedCardHolder];

  const cardholders524Status = cardholdersToDisplay.map((holder) => {
    const cardholderName = cardholders.find((u) => u.id === holder).name;
    const dateSortedCards524 = pipe((cards) => {
      return cards.filter(
        (card) =>
          wasCardOpenedWithinLast24Months(card.appDate) &&
          card.cardType !== "Business"
      );
    }, sortCardsByDate)(cardsByHolder[holder]);

    const cardsListComponent =
      dateSortedCards524.length > 0 ? (
        windowWidth > 1000 ? (
          <CardList
            cards={dateSortedCards524}
            showEditDelete={false}
            showUser={false}
            showCompactTable={true}
          />
        ) : (
          <CardListCards
            cards={dateSortedCards524}
            showEditDelete={false}
            showUserName={false}
          />
        )
      ) : null;

    const five24TrackerElem =
      dateSortedCards524.length > 0 ? (
        <>
          <FiveTwentyFourStatus
            percent={(dateSortedCards524.length / 5) * 100}
            label={`${dateSortedCards524.length}/5`}
            key={holder.id}
          />
        </>
      ) : (
        "This user has opened 0 personal cards in the last 24 months"
      );

    return (
      <>
        <FiveTwentyFourAccordion
          five24Cards={cardsListComponent}
          user={cardholderName}
          showCards={dateSortedCards524.length > 0}
          fiveTwentyFourStatusElement={five24TrackerElem}
        />
        <br />
      </>
    );
  });

  return (
    <div className="fiveTwentyFourContainer">
      <h2 className="sectionHeaders">5/24 Status</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SelectInput
            name="id"
            label="Select User to View"
            value={selectedCardHolder}
            defaultOption="All Users"
            options={cardholders.map((user) => ({
              value: user.id,
              text: user.name,
            }))}
            onChange={handleChange}
            disableDefaultOption={false}
            // error={errors.author}
          />
          <hr />
          {cardholders524Status}
        </>
      )}
    </div>
  );
};

FiveTwentyFourPage.propTypes = {
  cards: PropTypes.array.isRequired,
  cardsByHolder: PropTypes.object.isRequired,
  loadCards: PropTypes.func.isRequired,
  cardholders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCardholdersFromFirebase: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardholders: state.cardholders,
    cardsByHolder: state.cardholders.reduce((obj, user) => {
      obj[user.id] = state.cards.filter((card) => card.userId === user.id);
      return obj;
    }, {}),
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards: loadCardsFromFirebase,
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveTwentyFourPage);
