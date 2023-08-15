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
import LoyaltyForm from "../loyalty/LoyaltyForm";
import { useUser } from "reactfire";

const newCardHolder = {
  id: null,
  name: "",
};

function LoyaltyAddEditModal({ cardHolder, saveLoyaltyDataToFirebase }) {
  const [cardHolderForModal, setCardHolderForModal] = useState(
    cardHolder ? { ...cardHolder } : newCardHolder
  );
  const [show, setShow] = useState(false);
  const { data: user } = useUser();

  const toggleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === LOYALTY_DATA_KEYS.loyaltyType) {
      const filteredPrograms = PROGRAMS.filter(
        (program) => program.type === value
      );
    }

    setCardHolderForModal((prevValue) => ({
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
    cardHolderForModal.password = maskPwd(cardHolderForModal.password);

    saveLoyaltyDataToFirebase(cardHolderForModal, user?.uid);

    toast.success(
      cardHolderForModal?.id === null
        ? "Loyalty Account Created"
        : "Loyalty Account Updated"
    );
    toggleShow();
  };

  function clearLoyaltyAccState() {
    setCardHolderForModal(newCardHolder);
    toggleShow();
  }

  return (
    <>
      {cardHolderForModal.id !== null ? (
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
          Add Card Holder
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {cardHolderForModal.id ? "Edit" : "Add"} Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoyaltyForm
            loyaltyAcc={cardHolderForModal}
            onSave={handleSave}
            onChange={handleChange}
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
