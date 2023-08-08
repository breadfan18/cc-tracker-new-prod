import React, { useEffect, useState } from "react";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterCards";

export default function CardsByUserDropDown({ cards }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "1");
  const showAllUsers =
    isNaN(selectedUser) || selectedUser === undefined || selectedUser === "0";

  const cardsForSelectedUser = showAllUsers
    ? cards
    : cards.filter((card) => card.userId === parseInt(selectedUser));

  const { cardsFilter, setCardsFilter, handleCardsFilter } =
    useFilteredData(cardsForSelectedUser);

  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    setCardsFilter({
      query: "",
      cardList: [...cardsForSelectedUser],
    });
  }, [selectedUser]);

  const handleUserChange = (event) =>
    setSelectedUser(event.target.value || "0");

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
};
