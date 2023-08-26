import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardHolderAddEditModal from "./CardHolderAddEditModal";

const CardholdersList = ({ cardholders }) => {
  return cardholders.length === 0 ? (
    <EmptyList dataType={"card holders"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader"></th>
          <th className="tableHeader">First Name </th>
          <th className="tableHeader">Last Name </th>
          <th className="tableHeader"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {cardholders.map((holder) => {
          return (
            <tr key={holder.id}>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <img
                  src={holder.img || "https://i.imgur.com/JFgA7EB.png"}
                  alt="AA"
                  style={{
                    height: "4rem",
                    width: "4rem",
                    borderRadius: "50%",
                    border: "2px solid gray",
                  }}
                />
              </td>
              <td>{holder.name.split(" ")[0]}</td>
              <td>{holder.name.split(" ")[1]}</td>
              <td className="editDeleteCard">
                <CardHolderAddEditModal cardholder={holder} />
                <ConfirmDeleteModal data={holder} dataType="cardHolder" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    state,
    ownProps,
  };
};

CardholdersList.propTypes = {
  cardholders: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(CardholdersList);
