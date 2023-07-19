import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  saveCardToJsonServer,
  saveCardToFirebase,
} from "../../redux/actions/cardsActions";
import CardForm from "./CardForm";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { ISSUERS, NEW_CARD } from "../../constants";

function CardAddEditModal({
  card,
  saveCardToFirebase,
  setModalOpen,
  modalOpen,
}) {
  const [cardForModal, setCardForModal] = useState(
    card ? { ...card } : NEW_CARD
  );
  const [inquiries, setInquiries] = useState({ ...cardForModal.inquiries });
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  function handleChange(event) {
    const { name, value, checked } = event.target;

    if (name === "inquiries") {
      // eslint-disable-next-line no-unused-expressions
      value === "experian"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : value === "equifax"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : value === "transunion"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : null;
    } else {
      setCardForModal((prevCard) => ({
        ...prevCard,
        [name]:
          name === "userId"
            ? parseInt(value, 10)
            : name === "bonusEarned"
            ? checked
            : name === "issuer"
            ? ISSUERS.find((issuer) => issuer.name === value)
            : value,
      }));
    }
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();
    for (let i in inquiries) {
      if (inquiries[i] === null) inquiries[i] = false;
    }
    const finalCard = { ...cardForModal, inquiries: inquiries };
    saveCardToFirebase(finalCard);
    toast.success(cardForModal.id === null ? "Card Created" : "Card Updated");
    toggleModal();
  }

  function clearCardState() {
    setCardForModal(NEW_CARD);
    toggleShow();
  }

  function handleSaveForJsonServer(event) {
    event.preventDefault();

    for (let i in inquiries) {
      if (inquiries[i] === null) inquiries[i] = false;
    }
    const finalCard = { ...cardForModal, inquiries: inquiries };
    // if (!formIsValid()) return;
    saveCardToJsonServer(finalCard)
      .then(() => {
        toast.success(
          cardForModal.id === null ? "Card Created" : "Card Updated"
        );
        // eslint-disable-next-line no-restricted-globals
        history.push("/cards");
      })
      .catch(() => {
        // setErrors({
        //   onSave: error.message,
        // });
      });

    toggleShow();
    setCardForModal(NEW_CARD);
  }

  function handleEditButtonClick(e) {
    e.stopPropagation();
    toggleShow();
    setModalOpen(true);
  }

  function toggleModal() {
    toggleShow();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      {cardForModal.id !== null ? (
        <Button
          variant="success"
          onClick={handleEditButtonClick}
          className="rounded-circle"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearCardState}
          className="addButton"
        >
          Add Card
        </Button>
      )}

      <Modal
        show={show}
        onHide={toggleModal}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{cardForModal.id ? "Edit" : "Add"} Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardForm
            card={cardForModal}
            onSave={handleSaveForFirebase}
            onChange={handleChange}
            // toggle={toggle}
            // errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

CardAddEditModal.propTypes = {
  card: PropTypes.object,
  saveCardToFirebase: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func,
  modalOpen: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    state: state,
  };
}

const mapDispatchToProps = {
  saveCardToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardAddEditModal);
