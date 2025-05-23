import { useState } from "react";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { isCardData, useSortableData } from "../../hooks/sortData";
import { formatDate, formatCurrency } from "../../helpers";
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
import { getRemindersData } from "../../utils/reminderData";
import CardFavIcon from "./CardFavIcon";
import { useSelector } from "react-redux";
import StampedStatus from "./StampedStatus";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";

type CardListTableProps = {
  cards: Card[];
  showEditDelete: boolean;
  showUser: boolean;
  showCompactTable: boolean;
  windowWidth?: number;
};

export default function CardListTable({
  cards,
  showEditDelete,
  showUser,
  showCompactTable,
  windowWidth,
}: CardListTableProps) {
  const { data, requestSort } = useSortableData(cards);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const theme = useSelector((state: MainReduxState) => state.theme);

  const routeChange = (card: Card, e) => {
    let path = `/card/${card.id}`;
    if (!modalOpen && e.target.tagName !== "path") history.push(path);
  };

  function handleTrColorOnHover(e) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = "table-active";
    }
  }
  function handleTrColorReset(e) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = null;
    }
  }

  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table variant={theme === "dark" ? "dark" : undefined}>
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
          {windowWidth && windowWidth > 1505 && (
            <th className="tableHeader">
              Credit Line{" "}
              <FaSort onClick={() => requestSort(CARD_DATA_KEYS.creditLine)} />
            </th>
          )}
          {windowWidth && windowWidth > 1550 && (
            <th className="tableHeader">Credit Pull</th>
          )}
          <th className="tableHeader">
            Annual Fee{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.annualFee)} />
          </th>
          {windowWidth && windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend Req</th>
          )}
          {windowWidth && windowWidth > 1380 && !showCompactTable && (
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
          if (!isCardData(card)) return null;

          const {
            nextFeeText,
            nextFeeColor,
            isSpendByDateClose,
            spendDaysRemaining,
            spendDaysRemainingText,
            spendByTextColor,
            showAnnualFeeDueIcon,
          } = getRemindersData(card);

          const {
            id,
            status,
            signupBonus,
            appDate,
            cardholder,
            inquiries,
            creditLine,
            card: cardName,
            cardType,
            annualFee,
            spendReq,
            spendBy,
            bonusEarned,
            issuer,
          } = card;

          const noBonus =
            signupBonus === undefined ||
            signupBonus === "0" ||
            signupBonus === "";
          return (
            <tr
              key={id}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e)}
              style={{ cursor: "pointer" }}
              onClick={(e) => routeChange(card, e)}
            >
              {!showCompactTable && (
                <td style={{ paddingLeft: 0 }}>
                  <div
                    style={{
                      backgroundColor: bonusEarned
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
              <td>{formatDate(appDate)}</td>
              {showUser && <td>{cardholder}</td>}
              <td>
                <img className="issuerLogos" src={issuer.img} alt="" />
                {`  ${cardName}`}
              </td>
              <td>{cardType}</td>
              {windowWidth && windowWidth > 1505 && (
                <td>{formatCurrency(creditLine)}</td>
              )}
              {windowWidth && windowWidth > 1550 && (
                <td>
                  <CreditBureauIcons inquiries={inquiries} />
                </td>
              )}
              <td>
                {status === "open" ? (
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
                        <p>{formatCurrency(annualFee)}</p>
                      </div>
                      <small
                        style={{
                          color: nextFeeColor ?? "",
                          fontSize: "12px",
                        }}
                      >
                        {nextFeeText}
                      </small>
                    </div>
                  </div>
                ) : (
                  <StampedStatus status={status} />
                )}
              </td>
              {windowWidth && windowWidth > 1380 && !showCompactTable && (
                <td>{formatCurrency(spendReq)}</td>
              )}
              {windowWidth && windowWidth > 1380 && !showCompactTable && (
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flexAndVerticalCenter">
                      {((spendBy && spendDaysRemaining && isSpendByDateClose) ||
                        (spendDaysRemaining && spendDaysRemaining < 0)) && (
                        <BsFillBellFill
                          style={{
                            color: "orange",
                            fontSize: "1.3rem",
                            marginRight: "5px",
                          }}
                          title={REMINDERS_TEXT_BONUS}
                        />
                      )}
                      <p>{formatDate(spendBy)}</p>
                    </div>
                    <small
                      style={{
                        fontSize: "12px",
                        color: spendByTextColor ?? "",
                      }}
                    >
                      {spendDaysRemainingText}
                    </small>
                  </div>
                </td>
              )}
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <CardFavIcon card={card} />
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
