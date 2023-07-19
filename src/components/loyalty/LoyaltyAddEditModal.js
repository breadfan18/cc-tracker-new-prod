import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveLoyaltyDataToFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { LOYALTY_DATA_KEYS, PROGRAMS } from "../../constants";
import { maskPwd } from "../../helpers";
import LoyaltyForm from "./LoyaltyForm";

const newLoyaltyAcc = {
  id: null,
  loyaltyType: "",
  program: null,
  memberId: "",
  loginId: "",
  password: "",
  userId: null,
};

function LoyaltyAddEditModal({ loyaltyAcc, saveLoyaltyDataToFirebase }) {
  const [loyaltyAccForModal, setLoyaltyAccForModal] = useState(
    loyaltyAcc ? { ...loyaltyAcc } : newLoyaltyAcc
  );
  const [programsFilteredByType, setFilteredPrograms] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === LOYALTY_DATA_KEYS.loyaltyType) {
      const filteredPrograms = PROGRAMS.filter(
        (program) => program.type === value
      );
      setFilteredPrograms(filteredPrograms);
    }

    setLoyaltyAccForModal((prevValue) => ({
      ...prevValue,
      [name]:
        name === "id" || name === "userId"
          ? parseInt(value, 10)
          : name === LOYALTY_DATA_KEYS.program
          ? PROGRAMS.find((program) => program.id === parseInt(value))
          : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    loyaltyAccForModal.password = maskPwd(loyaltyAccForModal.password);

    saveLoyaltyDataToFirebase(loyaltyAccForModal);

    toast.success(
      loyaltyAccForModal?.id === null
        ? "Loyalty Account Created"
        : "Loyalty Account Updated"
    );
    toggleShow();
  };

  function clearLoyaltyAccState() {
    setLoyaltyAccForModal(newLoyaltyAcc);
    toggleShow();
  }

  return (
    <>
      {loyaltyAccForModal.id !== null ? (
        <Button
          variant="success"
          onClick={toggleShow}
          className="rounded-circle"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearLoyaltyAccState}
          className="addButton"
        >
          Add Account
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {loyaltyAccForModal.id ? "Edit" : "Add"} Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoyaltyForm
            loyaltyAcc={loyaltyAccForModal}
            onSave={handleSave}
            onChange={handleChange}
            filteredPrograms={programsFilteredByType}
            // errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

LoyaltyAddEditModal.propTypes = {
  loyaltyAcc: PropTypes.object,
  saveLoyaltyDataToFirebase: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  saveLoyaltyDataToFirebase,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoyaltyAddEditModal);
