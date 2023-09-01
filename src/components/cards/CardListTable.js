import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import {
  formatDate,
  titleCase,
  formatCurrency,
  setColorForCardStatus,
} from "../../helpers";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CARD_DATA_KEYS, DELETE_MODAL_TYPES } from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import CreditBureauIcons from "../common/CreditBureauIcons";

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
          <th className="tableHeader">Next Fee Date</th>
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend Req</th>
          )}
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend By</th>
          )}
          {windowWidth > 1070 && !showCompactTable && (
            <th className="tableHeader">Bonus</th>
          )}
          {windowWidth > 1280 && !showCompactTable && (
            <th className="tableHeader">Bonus Earn Date</th>
          )}
          <th className="tableHeader">
            Status <FaSort onClick={() => requestSort(CARD_DATA_KEYS.status)} />
          </th>
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((card) => {
          return (
            <tr
              key={card.id}
              className={setColorForCardStatus("cardTable", card.status)}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e, card)}
              style={{ cursor: "pointer" }}
              onClick={() => routeChange(card)}
            >
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
              <td>{formatCurrency(card.annualFee)}</td>
              <td>{formatDate(card.nextFeeDate)}</td>
              {windowWidth > 1380 && !showCompactTable && (
                <td>{formatCurrency(card.spendReq)}</td>
              )}
              {windowWidth > 1380 && !showCompactTable && (
                <td>{formatDate(card.spendBy)}</td>
              )}
              {windowWidth > 1070 && !showCompactTable && (
                <td>
                  <BonusEarnStatusIcon
                    bonusEarned={card.bonusEarned}
                    iconSize="1.3rem"
                  />
                  {card.signupBonus}
                </td>
              )}
              {windowWidth > 1280 && !showCompactTable && (
                <td>{formatDate(card.bonusEarnDate)}</td>
              )}
              <td>{titleCase(card.status)}</td>
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
