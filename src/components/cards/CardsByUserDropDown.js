import React, { useEffect, useState } from "react";
import CardListCards from "./CardListCards";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterCards";
import { useSelector } from "react-redux";
import _ from "lodash";
import useCardsFilter from "../../hooks/filterCards2";
import Filters from "./Filters";
function CardsByUserDropDown({ cards }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "all-cards");
  const [showFilter, setShowFilter] = useState(false);
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );

  const {
    filters,
    filteredData,
    setCardNameFilter,
    setCardTypeFilter,
    setStatusFilter,
    resetFilters,
  } = useCardsFilter(cards);

  const showAllUsers =
    selectedUser === undefined || selectedUser === "all-cards";

  const cardsForSelectedUser = showAllUsers
    ? filteredData
    : selectedUser === "favorites"
    ? filteredData.filter((card) => card.isFav)
    : filteredData.filter((card) => card.userId === selectedUser);

  const handleUserChange = (event) =>
    setSelectedUser(event.target.value || "all-cards");

  return (
    <div className="cardsDropDownContainer">
      {showFilter && (
        <Filters
          filters={filters}
          setCardNameFilter={setCardNameFilter}
          setCardTypeFilter={setCardTypeFilter}
          setStatusFilter={setStatusFilter}
          resetFilters={resetFilters}
        />
      )}
      <div id="cardFilterContainer">
        <Form.Select
          id="cardFilterUserSelect"
          onChange={handleUserChange}
          value={selectedUser}
        >
          <option value="all-cards">All Users</option>
          {cardholders.map((holder) => {
            return (
              <option key={holder.id} value={holder.id}>
                {holder.name}
              </option>
            );
          })}
          <option value="favorites">Favorites</option>
        </Form.Select>
        <Button
          className="filterButtonSmallScreen"
          onClick={() => setShowFilter(!showFilter)}
          style={{ minWidth: "10rem" }}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      <Button
        className="cardByDropDownFavButton"
        onClick={() => setSelectedUser("favorites")}
        active={selectedUser === "favorites"}
      >
        Favorites
      </Button>
      <hr />
      <CardListCards
        cards={cardsForSelectedUser}
        showEditDelete
        showUserName={showAllUsers}
        showBonusInfo
      />
    </div>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
};

export default CardsByUserDropDown;
