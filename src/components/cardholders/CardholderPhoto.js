import React from "react";
import { CARDHOLDER_STOCK_IMG } from "../../constants";
import { TbPhotoEdit } from "react-icons/tb";

export default function CardholderPhoto({
  img,
  heightAndWidth,
  imgOnCard,
  editMode,
}) {
  const baseStyles = {
    height: heightAndWidth,
    width: heightAndWidth,
    borderRadius: "50%",
    border: "2px solid gray",
    objectFit: "cover",
  };

  const photoOnCardStyles = {
    alignSelf: "center",
    position: "absolute",
    marginTop: "100px",
    marginBottom: "50px",
    padding: "2px",
  };

  const finalStyles = imgOnCard
    ? { ...baseStyles, ...photoOnCardStyles }
    : baseStyles;
  return (
    <>
      <img
        src={img || CARDHOLDER_STOCK_IMG}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard && "cardholderCardImg"}
      />
      {editMode && (
        <TbPhotoEdit
          className="editPhotoIcon"
          onClick={() => console.log("foo")}
        />
      )}
    </>
  );
}
