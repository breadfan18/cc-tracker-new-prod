import { groupBy } from "lodash";
import { APP_COLOR_LIGHT_GRAY, CARD_STATUS } from "../../constants";
import { titleCase } from "../../helpers";
import { CardsDataMiniTableProps } from "../../types/cardholder-types";

export default function CardsDataMiniTable({
  cards,
  layout,
  isLoadedInCard,
}: CardsDataMiniTableProps) {
  const cardsByStatus = groupBy(cards, "status");
  const miniDataSectionMarginRight = layout === "list" ? "1.5rem" : "";
  return isLoadedInCard ? (
    <article>
      <p>Cards</p>
      <div className="cardholderCardMiniTableContainer">
        <table className="cardholderCardMiniTable">
          <thead style={{ borderBottom: "1px solid" + APP_COLOR_LIGHT_GRAY }}>
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
