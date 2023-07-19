import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import { wasCardOpenedWithinLast24Months } from "../../helpers";
import FiveTwentyFourAccordion from "./FiveTwentyFourAccordion";
import SelectInput from "../common/SelectInput";
import CardList from "../cards/CardListTable";
import { WindowWidthContext } from "../App";
import CardListCards from "../cards/CardListCards";

const FiveTwentyFourPage = ({ cards, loadCards, loading, cardsByUser }) => {
  const windowWidth = useContext(WindowWidthContext);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectedUser(name === "id" ? parseInt(value, 10) : value);
  }

  const usersToDisplay = isNaN(selectedUser)
    ? USERS.map((user) => user.id)
    : [selectedUser];

  const users524Status = usersToDisplay.map((user) => {
    const userName = USERS.find((u) => u.id === parseInt(user)).name;
    const cards524 = cardsByUser[user]
      .filter(
        (card) =>
          wasCardOpenedWithinLast24Months(card.appDate) &&
          card.cardType !== "Business"
      )
      .map((card) => {
        return { ...card, userName };
      });

    const cardsListComponent =
      cards524.length > 0 ? (
        windowWidth > 1000 ? (
          <CardList
            cards={cards524}
            showEditDelete={false}
            showUser={false}
            showCompactTable={true}
          />
        ) : (
          <CardListCards
            cards={cards524}
            showEditDelete={false}
            showUserName={false}
          />
        )
      ) : null;

    const five24TrackerElem =
      cards524.length > 0 ? (
        <>
          <FiveTwentyFourStatus
            percent={(cards524.length / 5) * 100}
            label={`${cards524.length}/5`}
            key={user.id}
          />
        </>
      ) : (
        "This user has opened 0 personal cards in the last 24 months"
      );

    return (
      <>
        <FiveTwentyFourAccordion
          five24Cards={cardsListComponent}
          user={userName}
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
            value={selectedUser}
            defaultOption="All Users"
            options={USERS.map((user) => ({
              value: user.id,
              text: user.name,
            }))}
            onChange={handleChange}
            // error={errors.author}
          />
          <hr />
          {users524Status}
        </>
      )}
    </div>
  );
};

FiveTwentyFourPage.propTypes = {
  cards: PropTypes.array.isRequired,
  cardsByUser: PropTypes.object.isRequired,
  loadCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardsByUser: USERS.reduce((obj, user) => {
      obj[user.id] = state.cards.filter((card) => card.userId === user.id);
      return obj;
    }, {}),
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards: loadCardsFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveTwentyFourPage);
