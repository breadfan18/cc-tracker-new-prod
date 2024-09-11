import React from "react";
import { CREDIT_BUREAUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function InquiriesMiniTable({
  inquiries,
  layout,
  isLoadedInCard,
}) {
  const totalInquiries = inquiries
    ? Object.keys(inquiries).reduce((total, i) => (total += inquiries[i]), 0)
    : 0;
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";

  const inquiriesByBureau = CREDIT_BUREAUS.map((bureau) => {
    return {
      bureauName: bureau.name,
      inquiries: inquiries ? inquiries[bureau.name] : 0,
    };
  });

  return isLoadedInCard ? (
    <article>
      <p>Inquiries</p>
      <div className="cardholderCardMiniTableContainer">
        <table className="cardholderCardMiniTable">
          <thead style={{ borderBottom: "1px solid black" }}>
            <tr>
              {inquiriesByBureau.map((bureau) => (
                <th>{titleCase(bureau.bureauName)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {inquiriesByBureau.map((bureau) => (
                <th>{bureau.inquiries}</th>
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
      <p style={{ textAlign: "center" }}>{totalInquiries}</p>
      <hr />
      <div className="dataTableDataSection">
        {CREDIT_BUREAUS.map((bureau) => {
          return (
            <div key={bureau.name}>
              <label htmlFor="">{titleCase(bureau.name)}</label>
              <p>{inquiries ? inquiries[bureau.name] : 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
