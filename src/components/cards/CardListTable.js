import React, { useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useUser } from "reactfire";
import { useSortableData } from "../../hooks/sortData";
import {
  formatDate,
  formatCurrency,
  setColorForCardStatus,
} from "../../helpers";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  APP_COLOR_BLUE,
  APP_COLOR_LIGHT_BLACK,
  CARD_DATA_KEYS,
  DELETE_COLOR_RED,
  DELETE_MODAL_TYPES,
  EDIT_COLOR_GREEN,
  REMINDERS_TEXT_AF,
  REMINDERS_TEXT_BONUS,
} from "../../constants";
import CreditBureauIcons from "../common/CreditBureauIcons";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { getRemindersData } from "../../hooks/reminderData";
import CardFavIcon from "./CardFavIcon";

export default function CardListTable({
  cards,
  showEditDelete,
  showUser,
  showCompactTable,
  windowWidth,
}) {
  const { status, data: user } = useUser();
  const { data, requestSort } = useSortableData(cards);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const routeChange = (card, e) => {
    let path = `/card/${card.id}`;
    if (!modalOpen && e.target.tagName !== "path") history.push(path);
  };

  function handleTrColorOnHover(e) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = "table-active";
    }
  }
  function handleTrColorReset(e, card) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = setColorForCardStatus(
        "cardTable",
        card.status
      );
    }
  }

  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table>
      <thead>
        <tr>
          {!showCompactTable && <th></th>}
          <th className="tableHeader">
            App Date
            <FaSort
              onClick={() => requestSort(CARD_DATA_KEYS.appDate)}
              style={{ marginLeft: "5px" }}
            />
          </th>
          {showUser && (
            <th className="tableHeader">
              Card Holder
              <FaSort onClick={() => requestSort(CARD_DATA_KEYS.cardholder)} />
            </th>
          )}
          <th className="tableHeader">
            Card <FaSort onClick={() => requestSort(CARD_DATA_KEYS.card)} />
          </th>
          <th className="tableHeader">
            Type <FaSort onClick={() => requestSort(CARD_DATA_KEYS.cardType)} />
          </th>
          {windowWidth > 1505 && (
            <th className="tableHeader">
              Credit Line{" "}
              <FaSort onClick={() => requestSort(CARD_DATA_KEYS.creditLine)} />
            </th>
          )}
          {windowWidth > 1550 && <th className="tableHeader">Credit Pull</th>}
          <th className="tableHeader">
            Annual Fee{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.annualFee)} />
          </th>
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend Req</th>
          )}
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend By</th>
          )}
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((card) => {
          const {
            nextFeeText,
            nextFeeColor,
            isSpendByDateClose,
            spendDaysRemaining,
            spendDaysRemainingText,
            spendByTextColor,
            showAnnualFeeDueIcon,
          } = getRemindersData(card);

          const noBonus =
            card.signupBonus === undefined || card.signupBonus === "0";

          return (
            <tr
              key={card.id}
              className={setColorForCardStatus("cardTable", card.status)}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e, card)}
              style={{ cursor: "pointer" }}
              onClick={(e) => routeChange(card, e)}
            >
              {!showCompactTable && (
                <td style={{ paddingLeft: 0 }}>
                  <div
                    style={{
                      backgroundColor: card.bonusEarned
                        ? EDIT_COLOR_GREEN
                        : noBonus
                        ? APP_COLOR_LIGHT_BLACK
                        : APP_COLOR_BLUE,
                      borderRadius: "0 30px 30px 0",
                      padding: "5px 3px",
                    }}
                  >
                    <BonusStatusAndEarnDate
                      card={card}
                      iconSize="2.5rem"
                      inverseColor
                    />
                  </div>
                </td>
              )}
              <td>{formatDate(card.appDate)}</td>
              {showUser && <td>{card.cardholder}</td>}
              <td>
                <img className="issuerLogos" src={card.issuer.img} alt="" />
                {`  ${card.card}`}
              </td>
              <td>{card.cardType}</td>
              {windowWidth > 1505 && <td>{formatCurrency(card.creditLine)}</td>}
              {windowWidth > 1550 && (
                <td>
                  <CreditBureauIcons inquiries={card.inquiries} />
                </td>
              )}
              <td>
                <div className="flexAndVerticalCenter">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flexAndVerticalCenter">
                      {showAnnualFeeDueIcon && (
                        <TbAlertOctagonFilled
                          style={{
                            color: DELETE_COLOR_RED,
                            fontSize: "1.3rem",
                            marginRight: "5px",
                          }}
                          title={REMINDERS_TEXT_AF}
                        />
                      )}
                      <p>{formatCurrency(card.annualFee)}</p>
                    </div>
                    <small
                      style={{
                        color: nextFeeColor,
                        fontSize: "12px",
                      }}
                    >
                      {nextFeeText}
                    </small>
                  </div>
                </div>
              </td>
              {windowWidth > 1380 && !showCompactTable && (
                <td>{formatCurrency(card.spendReq)}</td>
              )}
              {windowWidth > 1380 && !showCompactTable && (
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flexAndVerticalCenter">
                      {((card.spendBy &&
                        spendDaysRemaining &&
                        isSpendByDateClose) ||
                        spendDaysRemaining < 0) && (
                        <BsFillBellFill
                          style={{
                            color: "orange",
                            fontSize: "1.3rem",
                            marginRight: "5px",
                          }}
                          title={REMINDERS_TEXT_BONUS}
                        />
                      )}
                      <p>{formatDate(card.spendBy)}</p>
                    </div>
                    <small
                      style={{ fontSize: "12px", color: spendByTextColor }}
                    >
                      {spendDaysRemainingText}
                    </small>
                  </div>
                </td>
              )}
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <CardFavIcon card={card} firebaseUid={user?.uid} />
                    <CardAddEditModal card={card} setModalOpen={setModalOpen} />
                    <ConfirmDeleteModal
                      data={card}
                      dataType={DELETE_MODAL_TYPES.card}
                      setModalOpen={setModalOpen}
                    />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

CardListTable.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
  showUser: PropTypes.bool.isRequired,
  showCompactTable: PropTypes.bool.isRequired,
};
