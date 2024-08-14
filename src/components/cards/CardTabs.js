import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardListTable from "./CardListTable";
import { useSelector } from "react-redux";
import CardListCards from "./CardListCards";
import { useFilteredData } from "../../hooks/filterCards";
import _ from "lodash";

function CardTabs({ cards, windowWidth, isDesktop }) {
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "all-cards");
  const handleSelectTab = (tabKey) => setSelectedUser(tabKey.toString());
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );

  const cardsForSelectedUser =
    selectedUser === "all-cards"
      ? cards
      : selectedUser === "favorites"
      ? cards.filter((card) => card.isFav)
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

  const userTabs = cardholders.map((user) => {
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        {isDesktop ? (
          <CardListTable
            cards={cardsFilter.cardList}
            showEditDelete
            showUser={false}
            showCompactTable={false}
            windowWidth={windowWidth}
          />
        ) : (
          <CardListCards
            cards={cardsFilter.cardList}
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
      <input
        type="search"
        value={cardsFilter.query}
        onChange={handleCardsFilter}
        placeholder="Filter by card name.."
        className="cardTabsFilterInput"
        style={{ width: "clamp(21vw, 25vw, 32vw)" }}
      />
      <Tabs
        defaultActiveKey={selectedUser}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="all-cards" title="All Cards">
          {isDesktop ? (
            <CardListTable
              cards={cardsFilter.cardList}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
              windowWidth={windowWidth}
            />
          ) : (
            <CardListCards
              cards={cardsFilter.cardList}
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
              cards={cardsFilter.cardList}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
              windowWidth={windowWidth}
            />
          ) : (
            <CardListCards
              cards={cardsFilter.cardList}
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
