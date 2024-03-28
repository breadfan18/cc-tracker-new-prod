import React from "react";
import { Table } from "react-bootstrap";
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
  titleCase,
} from "../../helpers";
import { APP_COLOR_BLUE } from "../../constants";
import CreditBureauIcons from "../common/CreditBureauIcons";

export default function CardDetailsInfo({ card }) {
  return (
    <Table className={setColorForCardStatus("cardTable", card.status)}>
      <tbody className="align-middle">
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            App Date:
          </td>
          <td>{formatDate(card.appDate)}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Card Type:
          </td>
          <td>{card.cardType}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Annual Fee:
          </td>
          <td>{formatCurrency(card.annualFee)}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Next Fee Date:
          </td>
          <td>
            {card.nextFeeDate !== "" ? formatDate(card.nextFeeDate) : "N/A"}
          </td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Credit Line:
          </td>
          <td>{formatCurrency(card.creditLine)}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Inquiries:
          </td>
          <td>{<CreditBureauIcons inquiries={card.inquiries} />}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Spend Requirement:
          </td>
          <td>{formatCurrency(card.spendReq)}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Spend By:
          </td>
          <td>{card.spendBy !== "" ? formatDate(card.spendBy) : "N/A"}</td>
        </tr>
        <tr>
          <td
            style={{ color: APP_COLOR_BLUE }}
            className="cardDetailsFieldHeaders"
          >
            Card Status:
          </td>
          <td>{titleCase(card.status)}</td>
        </tr>
      </tbody>
    </Table>
  );
}
