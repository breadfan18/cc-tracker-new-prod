import React from "react";
import { groupBy } from "lodash";
import { titleCase } from "../../helpers";
import { ACCOUNT_TYPE } from "../../constants";

export default function LoyaltyDataMiniTable({ loyaltyData }) {
  const loyaltyByType = groupBy(loyaltyData, "loyaltyType");
  return (
    <section className="cardholderDataSection">
      <p style={{ textAlign: "center" }}>{loyaltyData?.length || 0}</p>
      <hr />
      <div className="dataTableDataSection">
        {ACCOUNT_TYPE.map((loyaltyType) => {
          return (
            <div>
              <label htmlFor="">{titleCase(loyaltyType)}</label>
              <p>{loyaltyByType[loyaltyType]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
