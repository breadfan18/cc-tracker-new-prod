import React from "react";
import { toast } from "react-toastify";
import { APP_COLOR_BLACK_OPACITY } from "../../constants";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyIcon({ dataToCopy }) {
  const copyFileNameToClipboard = (dataToCopy) => {
    navigator.clipboard
      .writeText(dataToCopy)
      .then(() => toast.info("Data copied to clipboard"))
      .catch((err) => toast.error("Error copying the data"));
  };
  return (
    <IoCopyOutline
      style={{
        marginRight: "5px",
        background: APP_COLOR_BLACK_OPACITY,
        padding: "5px",
        height: "1.7rem",
        width: "1.7rem",
        borderRadius: "5px",
        color: "gray",
        cursor: "pointer",
      }}
      onClick={() => copyFileNameToClipboard(dataToCopy)}
    />
  );
}
