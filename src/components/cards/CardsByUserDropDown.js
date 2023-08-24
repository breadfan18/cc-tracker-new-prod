import React, { useEffect, useState } from "react";
import CardListCards from "./CardListCards";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterCards";
import { connect } from "react-redux";

function CardsByUserDropDown({ cards, cardholders }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "all-cards");
  const showAllUsers =
    selectedUser === undefined || selectedUser === "all-cards";

  const cardsForSelectedUser = showAllUsers
    ? cards
    : cards.filter((card) => card.userId === selectedUser);

  const { cardsFilter, setCardsFilter, handleCardsFilter, filterCards } =
    useFilteredData(cardsForSelectedUser);

  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));

    if (cardsFilter.query !== "") {
      const filteredCards = filterCards(cardsFilter.query);
      setCardsFilter({
        query: cardsFilter.query,
        cardList: filteredCards,
      });
    } else {
      setCardsFilter({
        query: "",
        cardList: [...cardsForSelectedUser],
      });
    }
  }, [selectedUser, cards]);

  const handleUserChange = (event) =>
    setSelectedUser(event.target.value || "all-cards");

  return (
    <div className="cardsDropDownContainer">
      <div id="cardFilterContainer">
        <Form.Select
          id="cardFilterUserSelect"
          onChange={handleUserChange}
          value={selectedUser}
        >
          <option value="">All Users</option>
          {cardholders.map((holder) => {
            return (
              <option key={holder.id} value={holder.id}>
                {holder.name}
              </option>
            );
          })}
        </Form.Select>
        <input
          type="search"
          value={cardsFilter.query}
          onChange={handleCardsFilter}
          placeholder="Filter by card name.."
          id="cardFilterInput"
        />
      </div>
      <hr />
      <CardListCards cards={cardsFilter.cardList} showUserName={showAllUsers} />
    </div>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cardholders: state.cardholders,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsByUserDropDown);
