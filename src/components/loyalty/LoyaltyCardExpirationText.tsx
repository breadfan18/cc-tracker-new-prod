import { DELETE_COLOR_RED } from "../../constants";

type LoyaltyCardExpirationTextProps = {
  expirationDate: string;
  daysForExpiration?: number;
};

function LoyaltyCardExpirationText({
  expirationDate,
  daysForExpiration,
}: LoyaltyCardExpirationTextProps) {
  return (
    <p
      className="mb-0 cardBodyText"
      style={{ display: "flex", alignItems: "center" }}
    >
      <b>Expiration</b>
      {": "}
      <small
        className="cardTextValue"
        style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
      >
        {expirationDate}{" "}
        {daysForExpiration && (
          <p
            style={{
              margin: "2.5px 0 0 3px",
              fontSize: "11px",
              color: daysForExpiration <= 90 ? DELETE_COLOR_RED : "",
            }}
          >{`(Rewards expire in ${daysForExpiration} days)`}</p>
        )}
      </small>
    </p>
  );
}

export default LoyaltyCardExpirationText;
