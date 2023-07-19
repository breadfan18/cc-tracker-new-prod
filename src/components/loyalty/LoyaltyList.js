import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { LOYALTY_DATA_KEYS } from "../../constants";

const LoyaltyList = ({ loyaltyData, showEditDelete }) => {
  const { data, requestSort } = useSortableData(loyaltyData);

  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"loyalty account"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th></th>
          <th className="tableHeader">
            Program
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.program)} />
          </th>
          <th className="tableHeader">
            Member ID{" "}
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.memberId)} />
          </th>
          <th className="tableHeader">
            User Name{" "}
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.loginId)} />
          </th>
          <th className="tableHeader">
            Password{" "}
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.password)} />
          </th>
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((acc) => {
          return (
            <tr key={acc.id}>
              <td>
                <img className="loyaltyLogos" src={acc.program.img} alt="AA" />
              </td>
              <td>{acc.program.name}</td>
              <td>{acc.memberId}</td>
              <td>{acc.loginId}</td>
              <td>{acc.password}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <LoyaltyAddEditModal loyaltyAcc={acc} />
                    <ConfirmDeleteModal data={acc} dataType="loyaltyAcc" />
                  </td>
                </>
              )}
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

LoyaltyList.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  history: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoyaltyList);
