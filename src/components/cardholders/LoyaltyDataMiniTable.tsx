import { groupBy } from "lodash";
import { titleCase } from "../../helpers";
import { ACCOUNT_TYPE, APP_COLOR_LIGHT_GRAY } from "../../constants";
import { LoyaltyDataMiniTableProps } from "../../types/cardholder-types";

export default function LoyaltyDataMiniTable({
  loyaltyData,
  layout,
  isLoadedInCard,
}: LoyaltyDataMiniTableProps) {
  const loyaltyByType = groupBy(loyaltyData, "loyaltyType");
  const miniDataSectionMarginRight = layout === "list" ? "1.5rem" : "";
  return isLoadedInCard ? (
    <article>
      <p>Loyalty</p>
      <div className="cardholderCardMiniTableContainer">
        <table className="cardholderCardMiniTable">
          <thead style={{ borderBottom: "1px solid" + APP_COLOR_LIGHT_GRAY }}>
            <tr>
              {ACCOUNT_TYPE.map((loyaltyType) => (
                <th>{titleCase(loyaltyType)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {ACCOUNT_TYPE.map((loyaltyType) => (
                <td>{loyaltyByType[loyaltyType]?.length || 0}</td>
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
