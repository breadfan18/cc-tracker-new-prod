import React, { useEffect, useState } from "react";
import SelectInput from "../common/SelectInput";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";

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
      <SelectInput
        name="id"
        label="Select User"
        value={parseInt(selectedUser)}
        defaultOption="All Users"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={handleUserChange}
        // error={errors.author}
      />
      <hr />
      <div id="cardFilterContainer">
        <label id="cardFilterLabel">
          {showAllUsers
            ? "All Cards"
            : `${
                USERS.find(
                  (user) => user.id === parseInt(selectedUser)
                ).name.split(" ")[0]
              }'s cards`}
        </label>
        <input
          type="search"
          value={filter.query}
          onChange={handleFilter}
          placeholder="Filter by card name.."
          id="cardFilterInput"
        />
      </div>
      <br />
      <CardListCards cards={filter.cardList} showUserName={showAllUsers} />
    </div>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
};
