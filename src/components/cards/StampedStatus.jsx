import React from "react";
import { setColorForCardStatus } from "../../helpers";

export default function StampedStatus({ status }) {
  return (
    <div
      className="stamp"
      style={{
        background: setColorForCardStatus("cardCard", status),
        color: status === "closed" ? "#ff0000" : "orangered",
      }}
    >
      {status}
    </div>
  );
}
