import React from "react";
import { groupBy } from "lodash";
import { CARD_STATUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function CardsDataMiniTable({ cards, layout }) {
  const cardsByStatus = groupBy(cards, "status");
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return (
    <section
      className="cardholderDataSection"
      style={{ marginRight: miniDataSectionMarginRight }}
    >
      <p style={{ textAlign: "center" }}>{cards?.length || 0}</p>
      <hr />
      <div className="dataTableDataSection">
        {CARD_STATUS.map((status) => {
          return (
            <div key={status}>
              <label htmlFor="">{titleCase(status)}</label>
              <p>{cardsByStatus[status]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
