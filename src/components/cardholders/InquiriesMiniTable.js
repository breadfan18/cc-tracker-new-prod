import React from "react";
import { CREDIT_BUREAUS } from "../../constants";
import { titleCase } from "../../helpers";

export default function InquiriesMiniTable({ inquiries, layout }) {
  const totalInquiries = inquiries
    ? Object.keys(inquiries).reduce((total, i) => (total += inquiries[i]), 0)
    : 0;
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return (
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
