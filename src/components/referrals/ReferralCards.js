import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  APP_COLOR_BLACK_OPACITY,
  DELETE_MODAL_TYPES,
  REFERRAL_DATA_IN_CARD_VIEW,
} from "../../constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import ReferralCardText from "./ReferralCardText";
import { getReferralData } from "../../hooks/referralsData";
import ReferralsBonusStatusAndEarnDate from "./ReferralBonusStatusAndEarnDate";
import ReferralAddEditModal from "./ReferralAddEditModal";
import { FaLink } from "react-icons/fa6";

export default function ReferralCards({ referrals, cardsByHolder }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "20rem";
  const referralsData = referrals.map((referral) => {
    const { id, referralLink, referringCardholder, referringCard } =
      getReferralData(referral, cardsByHolder);
    return (
      <Card style={{ width: cardWidth }} key={id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div style={{ backgroundColor: APP_COLOR_BLACK_OPACITY }}>
            <Card.Title className="cardCardTitle">
              <div style={{ padding: "10px" }}>
                <p>{referringCardholder}</p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(33, 37, 41, 0.75)",
                  }}
                >
                  {referringCard.issuer.name} {referringCard.card}
                </p>
              </div>

              <ReferralsBonusStatusAndEarnDate
                referral={referral}
                isCardTitle
                isCard
                iconSize="2rem"
                inverseColor
              />
            </Card.Title>
          </div>
          <section id="cardBody">
            <div>
              {Object.keys(REFERRAL_DATA_IN_CARD_VIEW).map((key) => (
                <ReferralCardText
                  referral={referral}
                  dataType={key}
                  cardsByHolder={cardsByHolder}
                />
              ))}
            </div>
          </section>
          <div className="editDeleteCard editDeleteOnCards">
            <a
              href={referralLink}
              target="_blank"
              rel="noreferrer"
              className={referralLink === "" && "linkDisabled"}
            >
              <FaLink
                id="referralLink"
                style={{
                  color: referralLink === "" && "gray",
                  border: "2px solid gray",
                }}
              />
            </a>
            <ReferralAddEditModal referral={referral} />
            <ConfirmDeleteModal
              data={referral}
              dataType={DELETE_MODAL_TYPES.referral}
            />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return referrals.length === 0 ? (
    <EmptyList dataType={"referral"} />
  ) : (
    <div id="cardCardContainer">{referralsData}</div>
  );
}

ReferralCards.propTypes = {
  referrals: PropTypes.array.isRequired,
  cardsByHolder: PropTypes.object.isRequired,
};
