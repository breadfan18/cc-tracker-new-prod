import React from "react";
import { groupBy } from "lodash";
import { titleCase } from "../../helpers";
import { ACCOUNT_TYPE } from "../../constants";

export default function LoyaltyDataMiniTable({ loyaltyData, layout }) {
  const loyaltyByType = groupBy(loyaltyData, "loyaltyType");
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return (
    <section
      className="cardholderDataSection"
      style={{ marginRight: miniDataSectionMarginRight }}
    >
      <p style={{ textAlign: "center" }}>{loyaltyData?.length || 0}</p>
      <hr />
      <div className="dataTableDataSection">
        {ACCOUNT_TYPE.map((loyaltyType) => {
          return (
            <div key={loyaltyType}>
              <label htmlFor="">{titleCase(loyaltyType)}</label>
              <p>{loyaltyByType[loyaltyType]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
