import React from "react";
import { CARDHOLDER_STOCK_IMG } from "../../constants";

export default function CardholderPhoto({ img, heightAndWidth, imgOnCard }) {
  const baseStyles = {
    height: heightAndWidth,
    width: heightAndWidth,
    borderRadius: "50%",
    border: "1px solid gray",
    objectFit: "cover",
  };

  const photoOnCardStyles = {
    marginTop: "5px",
    padding: "2px",
    borderRadius: "10%",
  };

  const finalStyles = imgOnCard
    ? { ...baseStyles, ...photoOnCardStyles }
    : baseStyles;
  return (
    <>
      <img
        src={img || CARDHOLDER_STOCK_IMG}
        onError={(e) => (e.target.src = CARDHOLDER_STOCK_IMG)}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard && "cardholderCardImg"}
      />
    </>
  );
}
