import React, { useEffect, useState } from "react";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function CardsByUserDropDown({ cards }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "1");
  const [filter, setFilter] = useState({
    query: "",
    cardList: [],
  });
  const showAllUsers =
    isNaN(selectedUser) || selectedUser === undefined || selectedUser === "0";

  const cardsForSelectedUser = showAllUsers
    ? cards
    : cards.filter((card) => card.userId === parseInt(selectedUser));

  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    setFilter({
      query: "",
      cardList: [...cardsForSelectedUser],
    });
  }, [selectedUser]);

  const handleUserChange = (event) =>
    setSelectedUser(event.target.value || "0");

  const handleFilter = (e) => {
    const filteredCards = cardsForSelectedUser.filter((card) => {
      if (e.target.value === "") return cardsForSelectedUser;
      const fullCardName = card.issuer.name + " " + card.card;
      return fullCardName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter({
      query: e.target.value,
      cardList: filteredCards,
    });
  };

  return (
    <div className="cardsDropDownContainer">
      <div id="cardFilterContainer">
        <Form.Select
          id="cardFilterUserSelect"
          onChange={handleUserChange}
          value={selectedUser}
        >
          <option value="">All Users</option>
          {USERS.map((user) => {
            return (
              <option key={user.id} value={parseInt(user.id)}>
                {user.name}
              </option>
            );
          })}
        </Form.Select>
        <input
          type="search"
          value={filter.query}
          onChange={handleFilter}
          placeholder="Filter by card name.."
          id="cardFilterInput"
        />
      </div>
      <hr />
      <CardListCards cards={filter.cardList} showUserName={showAllUsers} />
    </div>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
};
