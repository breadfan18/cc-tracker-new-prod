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
      className="copyIcon"
      onClick={() => copyFileNameToClipboard(dataToCopy)}
    />
  );
}
