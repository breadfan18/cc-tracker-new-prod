import React, { useEffect, useState } from "react";
import SelectInput from "../common/SelectInput";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";

export default function CardsByUserDropDown({ cards }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "1");
  const showAllUsers =
    isNaN(selectedUser) || selectedUser === undefined || selectedUser === "0";

  useEffect(
    () => localStorage.setItem("selectedUser", JSON.stringify(selectedUser)),
    [selectedUser]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedUser(value === "" ? "0" : value);
  };

  const cardsForSelectedUser = showAllUsers
    ? cards
    : cards.filter((card) => card.userId === parseInt(selectedUser));

  return (
    <>
      <SelectInput
        name="id"
        label="Select User"
        value={parseInt(selectedUser)}
        defaultOption="All Users"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={handleChange}
        // error={errors.author}
      />
      <hr />
      <label style={{ margin: "7px" }}>
        {showAllUsers
          ? "All Cards"
          : `${
              USERS.find(
                (user) => user.id === parseInt(selectedUser)
              ).name.split(" ")[0]
            }'s cards`}
      </label>
      <CardListCards cards={cardsForSelectedUser} showUserName={showAllUsers} />
    </>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
};
