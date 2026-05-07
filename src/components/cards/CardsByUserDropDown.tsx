import { useEffect, useState } from "react";
import CardListCards from "./CardListCards";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import _ from "lodash";
import useCardsFilter from "../../hooks/filterCards";
import Filters from "./Filters";
import SelectedFilters from "./SelectedFilters";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";

function CardsByUserDropDown({ cards }: { cards: Card[] }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser") || "");
  const [selectedUser, setSelectedUser] = useState<string>(
    storedUser || "all-cards",
  );
  const [showFilter, setShowFilter] = useState(false);
  const cardholders = useSelector((state: MainReduxState) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary),
  );

  useEffect(
    () => localStorage.setItem("selectedUser", JSON.stringify(selectedUser)),
    [selectedUser],
  );

  const {
    filters,
    filteredData,
    setCardNameFilter,
    setCardTypeFilter,
    setStatusFilter,
    setAnnualFeeFilter,
    removeFilter,
    hasActiveFilters,
    resetFilters,
  } = useCardsFilter(cards);

  const showAllUsers =
    selectedUser === undefined || selectedUser === "all-cards";

  const cardsForSelectedUser: Card[] = showAllUsers
    ? filteredData
    : selectedUser === "favorites"
      ? filteredData.filter((card) => card.isFav)
      : filteredData.filter((card) => card.userId === selectedUser);

  const handleUserChange = (event) =>
    setSelectedUser(event.target.value || "all-cards");

  return (
    <div className="cardsDropDownContainer">
      <Filters
        showFilter={showFilter}
        closeOnSelect
        filters={filters}
        setCardNameFilter={setCardNameFilter}
        setCardTypeFilter={setCardTypeFilter}
        setStatusFilter={setStatusFilter}
        setAnnualFeeFilter={setAnnualFeeFilter}
        removeFilter={removeFilter}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        setShowFilter={setShowFilter}
      />
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
          onClick={() => setShowFilter(true)}
          style={{ minWidth: "10rem" }}
        >
          Filters
        </Button>
      </div>
      <Button
        className="cardByDropDownFavButton"
        onClick={() => setSelectedUser("favorites")}
        active={selectedUser === "favorites"}
      >
        Favorites
      </Button>
      <SelectedFilters
        filters={filters}
        resetFilters={resetFilters}
        onRemoveFilter={removeFilter}
      />
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

export default CardsByUserDropDown;
