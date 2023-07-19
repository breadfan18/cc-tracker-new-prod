import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import LoyaltyList from "./LoyaltyList";
import { connect } from "react-redux";
import { ACCOUNT_TYPE, USERS } from "../../constants";
import { titleCase } from "../../helpers";
import LoyaltyAccordion from "./LoyaltyAccordion";
import _ from "lodash";
import LoyaltyCards from "./LoyaltyCards";
import EmptyList from "../common/EmptyList";
import { WindowWidthContext } from "../App";

function LoyaltyTabs({ loyaltyData }) {
  const windowWidth = useContext(WindowWidthContext);
  const loyaltyByType = _.groupBy(loyaltyData, (o) => o.loyaltyType);
  const loyaltyTabs = ACCOUNT_TYPE.map((loyaltyType) => {
    const loyaltyTypeData = loyaltyByType[loyaltyType];
    const loyaltyTypePerUser = _.groupBy(loyaltyTypeData, (o) => o.userId);
    const userCards = Object.keys(loyaltyTypePerUser).map((user) => {
      const loyaltyAccsForThisUser = loyaltyTypePerUser[user];
      const loyaltyList =
        windowWidth > 800 ? (
          <LoyaltyList
            loyaltyData={loyaltyAccsForThisUser}
            showEditDelete={true}
          />
        ) : (
          <LoyaltyCards loyaltyData={loyaltyAccsForThisUser} />
        );
      const thisUserName = USERS.find((u) => u.id === parseInt(user)).name;
      return (
        <>
          <LoyaltyAccordion
            accordionBody={loyaltyList}
            dataType={"Accounts"}
            windowWidth={windowWidth}
            user={thisUserName}
          />
          <br />
        </>
      );
    });

    return (
      <Tab
        eventKey={loyaltyType}
        title={titleCase(loyaltyType)}
        key={loyaltyType}
      >
        {userCards.length === 0 ? (
          <EmptyList dataType="loyalty account" />
        ) : (
          userCards
        )}
      </Tab>
    );
  });

  return (
    <Tabs
      defaultActiveKey="airlines"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {loyaltyTabs}
    </Tabs>
  );
}

LoyaltyTabs.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyTabs);
