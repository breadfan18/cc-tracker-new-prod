import React from "react";
import { handleInquiriesList } from "../../helpers";

export default function CreditBureauIcons({ inquiries }) {
  return handleInquiriesList(inquiries).map((inq) => (
    <img
      src={inq.img}
      alt={inq.name}
      className="bureauImgs"
      title={inq.name}
      key={inq.name}
    />
  ));
}
