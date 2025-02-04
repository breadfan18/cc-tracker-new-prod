import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import LoyaltyList from "./LoyaltyList";
import { ACCOUNT_TYPE } from "../../constants";
import { sortNumberDesc, titleCase } from "../../helpers";
import LoyaltyAccordion from "./LoyaltyAccordion";
import _ from "lodash";
import LoyaltyCards from "./LoyaltyCards";
import EmptyList from "../common/EmptyList";
import useWindhowWidth from "../../hooks/windowWidth";
import LoyaltyNewProgramForm from "./LoyaltyProgramForm";
import { IoMdAddCircle } from "react-icons/io";

function LoyaltyTabs({ loyaltyData }) {
  const { windowWidth, isDesktop } = useWindhowWidth();
  const loyaltyByType = _.groupBy(loyaltyData, (o) => o.loyaltyType);
  const [showNewLoyaltyProgramCreated, setNewLoyaltyProgramCreated] =
    useState(false);
  const loyaltyTabs = ACCOUNT_TYPE.map((loyaltyType) => {
    const loyaltyTypeData = loyaltyByType[loyaltyType];
    const loyaltyTypePerUser = _.groupBy(loyaltyTypeData, (o) => o.userId);
    const userAccounts = Object.keys(loyaltyTypePerUser).map((user) => {
      const loyaltyAccsForThisUser = loyaltyTypePerUser[user].sort((a, b) =>
        sortNumberDesc(a.rewardsBalance, b.rewardsBalance)
      );

      const loyaltyList =
        windowWidth > 800 ? (
          <LoyaltyList
            loyaltyData={loyaltyAccsForThisUser}
            showEditDelete={true}
            isDesktop={isDesktop}
          />
        ) : (
          <LoyaltyCards loyaltyData={loyaltyAccsForThisUser} />
        );
      const accountHolderName = loyaltyAccsForThisUser[0].accountHolder;
      return (
        <>
          <LoyaltyAccordion
            accordionBody={loyaltyList}
            dataType={"Accounts"}
            user={accountHolderName}
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
        {userAccounts.length === 0 ? (
          <EmptyList dataType="loyalty account" />
        ) : (
          userAccounts
        )}
      </Tab>
    );
  });

  const handleTabSelect = (selectedKey) => {
    if (selectedKey === "add-new") {
      setNewLoyaltyProgramCreated(false);
    }
  };

  return (
    <Tabs
      defaultActiveKey="airlines"
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={handleTabSelect}
    >
      {loyaltyTabs}
      <Tab
        eventKey="add-new"
        title={<IoMdAddCircle style={{ fontSize: "1.2rem" }} />}
      >
        <div className="modal-body" style={{ padding: 30, borderRadius: 10 }}>
          <LoyaltyNewProgramForm
            showProgramCreated={showNewLoyaltyProgramCreated}
            setProgramCreated={setNewLoyaltyProgramCreated}
          />
        </div>
      </Tab>
    </Tabs>
  );
}

LoyaltyTabs.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};

export default LoyaltyTabs;
