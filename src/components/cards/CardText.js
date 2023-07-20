import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, formatDate } from "../../helpers";
import { CARD_DATA_KEYS } from "../../constants";

function CardText({ card, dataType }) {
  const setCardDataType = (card, dataType) => {
    switch (dataType) {
      case CARD_DATA_KEYS.appDate:
        return {
          fieldName: "App Date",
          value: formatDate(card.appDate),
        };
      case CARD_DATA_KEYS.creditLine:
        return {
          fieldName: "Credit Line",
          value: formatCurrency(card.creditLine),
        };
      case CARD_DATA_KEYS.annualFee:
        return {
          fieldName: "Annual Fee",
          value: formatCurrency(card.annualFee),
        };
      case CARD_DATA_KEYS.nextFeeDate:
        return {
          fieldName: "Next Fee Date",
          value: card.nextFeeDate === "" ? "N/A" : formatDate(card.nextFeeDate),
        };
      case CARD_DATA_KEYS.bonusEarnDate:
        return {
          fieldName: "Bonus Earned Date",
          value:
            card.bonusEarnDate === undefined ||card.bonusEarnDate === ""
              ? "N/A"
              : formatDate(card.bonusEarnDate),
        };
      case CARD_DATA_KEYS.cardType:
        return {
          fieldName: "Card Type",
          value: card.cardType,
        };
      default:
        break;
    }
  };

  const cardDataType = setCardDataType(card, dataType);
  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{cardDataType.fieldName}</b>
        {": "}
        {cardDataType.value}
      </small>
    </p>
  );
}

CardText.propTypes = {
  card: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default CardText;
