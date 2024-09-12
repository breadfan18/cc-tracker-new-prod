import React from "react";
import { groupBy } from "lodash";
import { CARD_STATUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function CardsDataMiniTable({ cards, layout, isLoadedInCard }) {
  const cardsByStatus = groupBy(cards, "status");
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return isLoadedInCard ? (
    <article>
      <p>Cards</p>
      <div className="cardholderCardMiniTableContainer">
        <table className="cardholderCardMiniTable">
          <thead style={{ borderBottom: "0.5px solid gray" }}>
            <tr style={{ padding: "5px" }}>
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
      </div>
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
