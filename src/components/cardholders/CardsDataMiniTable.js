import React from "react";
import { groupBy } from "lodash";
import { APP_COLOR_LIGHT_GRAY, CARD_STATUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function CardsDataMiniTable({ cards, layout, isLoadedInCard }) {
  const cardsByStatus = groupBy(cards, "status");
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return isLoadedInCard ? (
    <article>
      <p>Cards</p>
      <table style={{ backgroundColor: APP_COLOR_LIGHT_GRAY, width: "100%" }}>
        <thead style={{ borderBottom: "1px solid black" }}>
          <tr>
            {CARD_STATUS.map((status) => (
              <th>{titleCase(status)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {CARD_STATUS.map((status) => (
              <td>{cardsByStatus[status]?.length || 0}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </article>
  ) : (
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
