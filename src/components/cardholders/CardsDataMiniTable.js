import React from "react";
import { groupBy } from "lodash";
import { CARD_STATUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function CardsDataMiniTable({ cards }) {
  const cardsByStatus = groupBy(cards, "status");
  return (
    <section className="cardholderDataSection">
      <p style={{ textAlign: "center" }}>{cards?.length || 0}</p>
      <hr />
      <div className="dataTableDataSection">
        {CARD_STATUS.map((status) => {
          return (
            <div>
              <label htmlFor="">{titleCase(status)}</label>
              <p>{cardsByStatus[status]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
