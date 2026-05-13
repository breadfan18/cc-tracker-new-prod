import { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoyaltyList from "./LoyaltyList";
import { ACCOUNT_TYPE } from "../../constants";
import { sortNumberDesc, titleCase } from "../../helpers";
import LoyaltyAccordion from "./LoyaltyAccordion";
import _ from "lodash";
import LoyaltyCards from "./LoyaltyCards";
import EmptyList from "../common/EmptyList";
import useWindhowWidth from "../../hooks/windowWidth";
import { LoyaltyData } from "../../types/loyalty-types";

function LoyaltyTabs({ loyaltyData }: { loyaltyData: LoyaltyData[] }) {
  const { windowWidth, isDesktop } = useWindhowWidth();
  const loyaltyByType = _.groupBy(loyaltyData, (o) => o.loyaltyType);

  const loyaltyTabs = ACCOUNT_TYPE.map((loyaltyType) => {
    const loyaltyTypeData = loyaltyByType[loyaltyType];
    const loyaltyTypePerUser = _.groupBy(loyaltyTypeData, (o) => o.userId);
    const userAccounts = Object.keys(loyaltyTypePerUser).map((user) => {
      const loyaltyAccsForThisUser = loyaltyTypePerUser[user].sort((a, b) =>
        sortNumberDesc(a.rewardsBalance, b.rewardsBalance),
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
        <Fragment key={`${loyaltyType}-${user}`}>
          <LoyaltyAccordion
            accordionBody={loyaltyList}
            user={accountHolderName}
          />
          <br />
        </Fragment>
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
    </Tabs>
  );
}

export default LoyaltyTabs;
