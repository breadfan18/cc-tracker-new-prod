import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCardFromFirebase } from "../../redux/actions/cardsActions";
import { deleteLoyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { deleteCardholderFromFirebase } from "../../redux/actions/cardholderActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "reactfire";
import { DELETE_MODAL_TYPES } from "../../constants";
function ConfirmDeleteModal({
  data,
  dataType,
  deleteCardFromFirebase,
  deleteLoyaltyDataFromFirebase,
  deleteCardholderFromFirebase,
  setModalOpen,
  redirect,
  disableBtn = false,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const { data: user } = useUser();

  function setDataText() {
    switch (dataType) {
      case DELETE_MODAL_TYPES.card:
        return "card";
      case DELETE_MODAL_TYPES.loyaltyAcc:
        return "loyalty account";
      case DELETE_MODAL_TYPES.cardholder:
        return "card holder";
      default:
        break;
    }
  }

  function handleDelete(data) {
    switch (dataType) {
      case "card":
        deleteCardFromFirebase(data, user?.uid);
        toast.success("Card deleted");
        if (redirect) history.push("/cards");
        break;
      case "loyaltyAcc":
        deleteLoyaltyDataFromFirebase(data, user?.uid);
        toast.success("Loyalty Account Deleted");
        break;
      case "cardholder":
        deleteCardholderFromFirebase(data, user?.uid);
        toast.success("Card Holder Deleted");
        break;
      default:
        break;
    }

    toggleModal();
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
    toggleShow();
    try {
      setModalOpen(true);
    } catch (err) {
      console.log("setModalOpen func is not passed for this component");
    }
  }

  function toggleModal() {
    toggleShow();
    try {
      setModalOpen(false);
    } catch (err) {
      console.log("setModalOpen func is not passed for this component");
    }
  }

  const dataText = setDataText();

  return (
    <>
      <DeleteButton onClick={handleDeleteButtonClick} disableBtn={disableBtn} />
      <Modal show={show} onHide={toggleModal} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this {dataText}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(data)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmDeleteModal.propTypes = {
  data: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  deleteCardFromFirebase: PropTypes.func.isRequired,
  deleteLoyaltyDataFromFirebase: PropTypes.func.isRequired,
  deleteCardholderFromFirebase: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func || undefined,
  redirect: PropTypes.bool,
};

const mapDispatchToProps = {
  deleteCardFromFirebase,
  deleteLoyaltyDataFromFirebase,
  deleteCardholderFromFirebase,
};

export default connect(null, mapDispatchToProps)(ConfirmDeleteModal);
