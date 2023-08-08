import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardListTable from "./CardListTable";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import CardListCards from "./CardListCards";
import { WindowWidthContext } from "../App";
import { useFilteredData } from "../../hooks/filterCards";

function CardTabs({ cards }) {
  const windowWidth = useContext(WindowWidthContext);
  const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedUser, setSelectedUser] = useState(storedUser || "1");
  const handleSelectTab = (tabKey) => setSelectedUser(tabKey.toString());
  const { filter, setFilter, handleFilter } = useFilteredData(cards);

  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    setFilter({
      query: "",
      cardList: [...cards],
    });
  }, [selectedUser]);

  const filterWidth =
    windowWidth >= 750
      ? "32vw"
      : windowWidth < 750 && windowWidth >= 727
      ? "30vw"
      : windowWidth < 727 && windowWidth >= 680
      ? "25vw"
      : windowWidth < 680 && windowWidth >= 661
      ? "23vw"
      : "21vw";

  const userTabs = USERS.map((user) => {
    const cardsForThisUser = cards.filter((card) => card.userId === user.id);
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        {windowWidth > 1000 ? (
          <CardListTable
            cards={cardsForThisUser}
            showEditDelete={true}
            showUser={false}
            showCompactTable={false}
          />
        ) : (
          <CardListCards cards={cardsForThisUser} showUserName={false} />
        )}
      </Tab>
    );
  });
  return (
    <>
      <input
        type="search"
        value={filter.query}
        onChange={handleFilter}
        placeholder="Filter by card name.."
        id="cardTabsFilterInput"
        style={{ width: filterWidth }}
      />
      <Tabs
        defaultActiveKey={selectedUser}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="0" title="All Cards">
          {windowWidth > 1000 ? (
            <CardListTable
              cards={filter.cardList}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
            />
          ) : (
            <CardListCards
              cards={filter.cardList}
              windowWidth={windowWidth}
              showUserName={true}
            />
          )}
        </Tab>
        {userTabs}
      </Tabs>
    </>
  );
}

CardTabs.propTypes = {
  cards: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardTabs);
