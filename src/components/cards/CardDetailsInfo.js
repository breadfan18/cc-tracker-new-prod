import React from "react";
import { Card, Table } from "react-bootstrap";
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
  titleCase,
} from "../../helpers";
import {
  APP_COLOR_BLUE_OPACITY,
  APP_COLOR_LIGHT_BLACK,
  APP_COLOR_LIGHT_BLUE,
  EDIT_COLOR_GREEN_OPACITY,
} from "../../constants";
import CreditBureauIcons from "../common/CreditBureauIcons";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { useSelector } from "react-redux";

export default function CardDetailsInfo({ windowWidth, card, isMobile }) {
  const theme = useSelector((state) => state.theme);

  const setCardDetailsBoxShadow = () => {
    return theme === "dark"
      ? "0 0 3px rgb(168, 166, 166)"
      : card.status === "open"
      ? "2px 0 10px gray"
      : `2px 0 15px ${setColorForCardStatus("cardCard", card.status)}`;
  };

  const noBonus = card.signupBonus === undefined || card.signupBonus === "0";

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
      {isMobile ? (
        <div className="cardDetailsMobileImgContainer" s>
          <img className="cardDetailsMobileImg" src={card.issuer.img} alt="" />
          <div
            style={{
              backgroundColor: card.bonusEarned
                ? EDIT_COLOR_GREEN_OPACITY
                : noBonus
                ? APP_COLOR_LIGHT_BLACK
                : APP_COLOR_BLUE_OPACITY,
            }}
          >
            <BonusStatusAndEarnDate
              card={card}
              inverseColor
              iconSize="clamp(1.5rem, 10vw, 2.3rem)"
              isCardDetailsPage
            />
          </div>
        </div>
      ) : (
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
      )}

      <article
        className="cardDetailsHeaderContainer"
        style={{ borderBottom: theme === "dark" && "1px solid #4e5359" }}
      >
        <div style={{ padding: "10px 16px" }}>
          <Card.Title
            style={{
              fontSize: "clamp(0.9rem, 4.5vw, 1.5rem)",
            }}
          >
            {card.issuer.name} {card.card}
          </Card.Title>
          <Card.Title style={{ fontSize: "clamp(0.7rem, 3.5vw, 1rem)" }}>
            {card.cardholder}
          </Card.Title>
        </div>
        {!isMobile && (
          <BonusStatusAndEarnDate
            card={card}
            isCard
            inverseColor
            iconSize="clamp(1.5rem, 10vw, 3rem)"
            isCardDetailsPage
          />
        )}
      </article>
      <Card.Body>
        <Table
          className={setColorForCardStatus("cardTable", card.status)}
          variant={theme === "dark" ? "dark" : null}
        >
          <tbody className="align-middle">
            <tr>
              <td className="cardDetailsFieldHeaders">App Date:</td>
              <td className="cardDetailsFieldValues">
                {formatDate(card.appDate)}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Card Type:</td>
              <td className="cardDetailsFieldValues">{card.cardType}</td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Annual Fee:</td>
              <td className="cardDetailsFieldValues">
                {formatCurrency(card.annualFee)}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Next Fee Date:</td>
              <td className="cardDetailsFieldValues">
                {card.nextFeeDate !== "" ? formatDate(card.nextFeeDate) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Credit Line:</td>
              <td className="cardDetailsFieldValues">
                {formatCurrency(card.creditLine)}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Inquiries:</td>
              <td className="cardDetailsFieldValues">
                {<CreditBureauIcons inquiries={card.inquiries} />}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Spend Requirement:</td>
              <td className="cardDetailsFieldValues">
                {formatCurrency(card.spendReq)}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Spend By:</td>
              <td className="cardDetailsFieldValues">
                {card.spendBy !== "" ? formatDate(card.spendBy) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="cardDetailsFieldHeaders">Card Status:</td>
              <td className="cardDetailsFieldValues">
                {titleCase(card.status)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

/* 
TO DO:
- Find place for bonus earn stuff in isMobile
- With the bonus stuff ribbon removed in isMobile, fix the right margin.. there's too much space there. 
- Fix the little riboon botton traingle thing hanging there in the small screen.
- Make card referrals better for isMobile
*/
