import React from "react";
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

  return (
    <Tabs
      defaultActiveKey="airlines"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {loyaltyTabs}
      <Tab eventKey="add-new" title={<IoMdAddCircle />}>
        <LoyaltyNewProgramForm />
      </Tab>
    </Tabs>
  );
}

LoyaltyTabs.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};

export default LoyaltyTabs;
