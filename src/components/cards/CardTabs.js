import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardListTable from "./CardListTable";
import { useSelector } from "react-redux";
import CardListCards from "./CardListCards";
import { Button } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterCards";
import _ from "lodash";
import Filters from "./Filters";
import useCardsFilter from "../../hooks/filterCards2";

function CardTabs({ cards, windowWidth, isDesktop }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "all-cards");
  const handleSelectTab = (tabKey) => setSelectedUser(tabKey.toString());
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

  const cardsForSelectedUser =
    selectedUser === "all-cards"
      ? filteredData
      : selectedUser === "favorites"
      ? filteredData.filter((card) => card.isFav)
      : filteredData.filter((card) => card.userId === selectedUser);

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

  const userTabs = cardholders.map((user) => {
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        {isDesktop ? (
          <CardListTable
            cards={cardsForSelectedUser}
            showEditDelete
            showUser={false}
            showCompactTable={false}
            windowWidth={windowWidth}
          />
        ) : (
          <CardListCards
            cards={cardsForSelectedUser}
            showEditDelete
            showUserName={false}
            showBonusInfo
          />
        )}
      </Tab>
    );
  });

  return (
    <>
      {showFilter && (
        <Filters
          filters={filters}
          setCardNameFilter={setCardNameFilter}
          setCardTypeFilter={setCardTypeFilter}
          setStatusFilter={setStatusFilter}
          resetFilters={resetFilters}
        />
      )}
      <Button
        className="filterButton"
        onClick={() => setShowFilter(!showFilter)}
        style={{ minWidth: "10rem" }}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </Button>
      <Tabs
        defaultActiveKey={selectedUser}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="all-cards" title="All Cards">
          {isDesktop ? (
            <CardListTable
              cards={filteredData}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
              windowWidth={windowWidth}
            />
          ) : (
            <CardListCards
              cards={filteredData}
              showEditDelete
              showUserName={true}
              showBonusInfo
            />
          )}
        </Tab>
        {userTabs}
        <Tab eventKey="favorites" title="Favorites">
          {isDesktop ? (
            <CardListTable
              cards={cardsForSelectedUser}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
              windowWidth={windowWidth}
            />
          ) : (
            <CardListCards
              cards={cardsForSelectedUser}
              showEditDelete
              showUserName={true}
              showBonusInfo
            />
          )}
        </Tab>
      </Tabs>
    </>
  );
}

CardTabs.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default CardTabs;
