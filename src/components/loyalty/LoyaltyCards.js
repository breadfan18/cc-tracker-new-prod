import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import LoyaltyCardText from "./LoyaltyCardText";
import {
  DELETE_COLOR_RED,
  DELETE_MODAL_TYPES,
  LOYALTY_DATA_KEYS,
} from "../../constants";
import LoyaltyCardExpirationText from "./LoyaltyCardExpirationText";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { daysTillRewardsExpiration, formatDate } from "../../helpers";

export default function LoyaltyCards({ loyaltyData }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "19rem";
  const allCards = loyaltyData.map((acc) => {
    const daysForRewardExpiration = daysTillRewardsExpiration(
      acc.rewardsExpiration
    );
    const setRewardsExpirationIcon = (numberOfDays) => {
      return numberOfDays > 30 && numberOfDays <= 90 ? (
        <BsFillBellFill style={{ color: "orange", fontSize: "1.5rem" }} />
      ) : numberOfDays <= 30 ? (
        <TbAlertOctagonFilled
          style={{ color: DELETE_COLOR_RED, fontSize: "1.5rem" }}
        />
      ) : (
        ""
      );
    };

    return (
      <Card style={{ width: cardWidth }} key={acc.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Subtitle className="mb-0 text-muted loyaltyCardTitle">
              <p style={{ margin: 0 }}>{acc.program.name}</p>
              <div>
                <img
                  src={acc.program.img}
                  alt="Issuer"
                  className="loyaltyLogos"
                />
              </div>
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
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.rewardsBalance}
              />
              <LoyaltyCardExpirationText
                expirationDate={formatDate(acc.rewardsExpiration)}
                daysForExpiration={daysForRewardExpiration}
              />
            </div>
            {daysForRewardExpiration && (
              <div>{setRewardsExpirationIcon(daysForRewardExpiration)}</div>
            )}
          </section>

          <div className="editDeleteCard editDeleteOnCards">
            <LoyaltyAddEditModal loyaltyAcc={acc} />
            <ConfirmDeleteModal
              data={acc}
              dataType={DELETE_MODAL_TYPES.loyaltyAcc}
            />
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
