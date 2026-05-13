import { useState } from "react";
import { Issuer } from "../../types/cards-types";
import { HEADER_CARD_LOGO } from "../../constants";

type IssuerLogoProps = {
  issuer: Issuer;
  alt?: string;
};

function getFallbackFontSize(name: string) {
  const length = name.length;
  if (length > 22) return "0.43rem";
  if (length > 16) return "0.5rem";
  if (length > 12) return "0.57rem";
  return "0.64rem";
}

export default function IssuerLogo({
  issuer,
  alt = "Issuer",
}: IssuerLogoProps) {
  const [imgLoadFailed, setImgLoadFailed] = useState(false);
  const issuerImg = issuer?.img?.trim() || "";
  const shouldUseTextFallback = issuerImg === HEADER_CARD_LOGO;
  const fallbackText = issuer?.name?.trim() || "Issuer";
  const fallbackFontSize = getFallbackFontSize(fallbackText);

  if (!issuerImg || shouldUseTextFallback || imgLoadFailed) {
    return (
      <div
        className="issuerLogos issuerLogoFallback"
        title={issuer?.name || "Issuer"}
        style={{ fontSize: fallbackFontSize }}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      className="issuerLogos"
      src={issuerImg}
      alt={alt}
      onError={() => setImgLoadFailed(true)}
    />
  );
}
