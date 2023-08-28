import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCardholderToFirebase } from "../../redux/actions/cardholderActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { useUser } from "reactfire";
import CardholderForm from "../loyalty/CardholderForm";
import { titleCase } from "../../helpers";

const newCardholder = {
  id: null,
  firstName: "",
  lastName: "",
  img: null,
};
function CardholderAddEditModal({
  cardholder,
  saveCardholderToFirebase,
  disableBtn,
}) {
  const [cardHolderForModal, setCardHolderForModal] = useState(
    cardholder
      ? {
          id: cardholder.id,
          firstName: cardholder.name.split(" ")[0],
          lastName: cardholder.name.split(" ")[1],
          img: cardholder.img,
        }
      : newCardholder
  );
  const [show, setShow] = useState(false);
  const { data: user } = useUser();

  const toggleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCardHolderForModal((prevValue) => ({
      ...prevValue,
      [name]: value.trim(" "),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const finalCardholder = {
      name:
        titleCase(cardHolderForModal.firstName) +
        " " +
        titleCase(cardHolderForModal.lastName),
      id: cardHolderForModal.id,
      img: cardHolderForModal.img || "",
    };
    saveCardholderToFirebase(finalCardholder, user?.uid);

    toast.success(
      cardHolderForModal?.id === null
        ? "Card Holder Created"
        : "Card Holder Updated"
    );
    toggleShow();
  };

  function clearCardholderState() {
    setCardHolderForModal(newCardholder);
    toggleShow();
  }

  return (
    <>
      {cardHolderForModal.id !== null ? (
        <Button
          variant="success"
          onClick={toggleShow}
          className="rounded-circle"
          disabled={disableBtn}
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearCardholderState}
          className="addButton"
        >
          Add Card Holder
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {cardHolderForModal.id ? "Edit" : "Add"} Card Holder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardholderForm
            cardholder={cardHolderForModal}
            onSave={handleSave}
            onChange={handleChange}
            // errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

CardholderAddEditModal.propTypes = {
  cardholder: PropTypes.object,
  saveLoyaltyDataToFirebase: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  saveCardholderToFirebase,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardholderAddEditModal);
