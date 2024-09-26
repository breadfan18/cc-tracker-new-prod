import React from "react";
import { Card, Table } from "react-bootstrap";
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
  titleCase,
} from "../../helpers";
import { APP_COLOR_LIGHT_BLUE } from "../../constants";
import CreditBureauIcons from "../common/CreditBureauIcons";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { useSelector } from "react-redux";

export default function CardDetailsInfo({
  windowWidth,
  card,
  isTablet,
  isMobile,
}) {
  const theme = useSelector((state) => state.theme);

  const setCardDetailsBoxShadow = () => {
    return theme === "dark"
      ? "0 0 3px rgb(168, 166, 166)"
      : card.status === "open"
      ? "2px 0 10px gray"
      : `2px 0 15px ${setColorForCardStatus("cardCard", card.status)}`;
  };

  return (
    <Card
      id="cardDetailsCard"
      className={`${theme === "dark" && "bg-dark"}`}
      style={{
        width: windowWidth > 1000 ? "30rem" : windowWidth,
        backgroundColor: setColorForCardStatus("cardCard", card.status),
        marginRight: windowWidth > 1000 ? "20px" : null,
        boxShadow: setCardDetailsBoxShadow(),
        alignSelf: "flex-start",
      }}
    >
      <Card.Img
        variant="top"
        src={card.issuer.img}
        style={{
          padding: "2rem",
          backgroundColor: APP_COLOR_LIGHT_BLUE,
          maxHeight: "10rem",
          objectFit: "contain",
        }}
      />
      <article
        className="cardDetailsHeaderContainer"
        style={{ borderBottom: theme === "dark" && "1px solid #4e5359" }}
      >
        <div style={{ padding: "10px 16px" }}>
          <Card.Title
            style={{
              fontSize: "clamp(0.9rem, 5vw, 1.5rem)",
            }}
          >
            {card.issuer.name} {card.card}
          </Card.Title>
          <Card.Title style={{ fontSize: "clamp(0.7rem, 4vw, 1rem)" }}>
            {card.cardholder}
          </Card.Title>
        </div>
        <BonusStatusAndEarnDate
          card={card}
          isCard
          inverseColor
          iconSize="clamp(1.5rem, 10vw, 3rem)"
          isCardDetailsPage
        />
      </article>
      <Card.Body>
        <Table
          className={setColorForCardStatus("cardTable", card.status)}
          variant={theme === "dark" ? "dark" : null}
        >
          <tbody className="align-middle">
            <tr>
              <td className="cardDetailsFieldHeaders">App Date:</td>
              <td>{formatDate(card.appDate)}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Card Type:</td>
              <td>{card.cardType}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Annual Fee:</td>
              <td>{formatCurrency(card.annualFee)}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Next Fee Date:</td>
              <td>
                {card.nextFeeDate !== "" ? formatDate(card.nextFeeDate) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Credit Line:</td>
              <td>{formatCurrency(card.creditLine)}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Inquiries:</td>
              <td>{<CreditBureauIcons inquiries={card.inquiries} />}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Spend Requirement:</td>
              <td>{formatCurrency(card.spendReq)}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Spend By:</td>
              <td>{card.spendBy !== "" ? formatDate(card.spendBy) : "N/A"}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Card Status:</td>
              <td>{titleCase(card.status)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
