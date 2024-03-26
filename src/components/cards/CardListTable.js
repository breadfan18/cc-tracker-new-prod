import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import {
  formatDate,
  formatCurrency,
  setColorForCardStatus,
} from "../../helpers";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  APP_COLOR_BLUE,
  CARD_DATA_KEYS,
  DELETE_COLOR_RED,
  DELETE_MODAL_TYPES,
  EDIT_COLOR_GREEN,
  REMINDERS_TEXT_AF,
  REMINDERS_TEXT_BONUS,
} from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import CreditBureauIcons from "../common/CreditBureauIcons";
import BonusStatusAndEarnDate from "./BonusStatusAndEarnDate";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { getRemindersData } from "../../hooks/reminderData";

export default function CardListTable({
  cards,
  showEditDelete,
  showUser,
  showCompactTable,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const { data, requestSort } = useSortableData(cards);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const routeChange = (card) => {
    let path = `/card/${card.id}`;
    if (!modalOpen) history.push(path);
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
          {windowWidth > 1070 && <th className="tableHeader">Bonus</th>}
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
            isAnnualFeeClose,
            isSpendByDateClose,
            spendDaysRemainingText,
            spendByTextColor,
          } = getRemindersData(card);

          return (
            <tr
              key={card.id}
              className={setColorForCardStatus("cardTable", card.status)}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e, card)}
              style={{ cursor: "pointer" }}
              onClick={() => routeChange(card)}
            >
              {!showCompactTable && (
                <td style={{ paddingLeft: 0 }}>
                  <div
                    style={{
                      backgroundColor: card.bonusEarned
                        ? EDIT_COLOR_GREEN
                        : APP_COLOR_BLUE,
                      borderRadius: "0 15px 15px 0",
                      padding: "5px 3px",
                      maxWidth: "40px",
                    }}
                  >
                    {
                      <>
                        <BonusEarnStatusIcon
                          bonusEarned={card.bonusEarned}
                          iconSize="2rem"
                          inverseColor
                        />
                      </>
                    }
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
                      {isAnnualFeeClose && (
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
                      {isSpendByDateClose && (
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
              {windowWidth > 1070 && (
                <td>
                  <BonusStatusAndEarnDate card={card} />
                </td>
              )}
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
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
