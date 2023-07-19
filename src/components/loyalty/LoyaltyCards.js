import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import LoyaltyCardText from "./LoyaltyCardText";
import { LOYALTY_DATA_KEYS } from "../../constants";

export default function LoyaltyCards({ loyaltyData }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCards = loyaltyData.map((acc) => {
    return (
      <Card style={{ width: cardWidth }} key={acc.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Subtitle
              className="mb-1 text-muted"
              style={{
                padding: "10px 0 10px 10px",
                borderRadius: "10px",
                margin: "0",
              }}
            >
              {acc.program.name}
            </Card.Subtitle>
          </div>
          <section id="loyaltyCardBody">
            <div>
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.memberId}
              />
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.loginId}
              />
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.password}
              />
            </div>
            <div>
              <img
                src={acc.program.img}
                alt="Issuer"
                className="loyaltyLogos"
              />
            </div>
          </section>

          <div className="editDeleteCard editDeleteOnCards">
            <LoyaltyAddEditModal loyaltyAcc={acc} />
            <ConfirmDeleteModal data={acc} dataType="loyaltyAcc" />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

LoyaltyCards.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};
