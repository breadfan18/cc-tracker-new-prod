import { CSSProperties } from "react";
import { CARDHOLDER_STOCK_IMG } from "../../constants";

type CardholderPhotoProps = {
  img: string;
  heightAndWidth: string;
  imgOnCard?: boolean;
};

export default function CardholderPhoto({
  img,
  heightAndWidth,
  imgOnCard,
}: CardholderPhotoProps) {
  const baseStyles: CSSProperties = {
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
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = CARDHOLDER_STOCK_IMG;
        }}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard ? "cardholderCardImg" : ""}
      />
    </>
  );
}
