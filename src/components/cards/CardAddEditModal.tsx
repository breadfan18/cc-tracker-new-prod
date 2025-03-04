import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import CardForm from "./CardForm";
import CardFormResponsive from "./CardFormResponsive";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { ISSUERS, NEW_CARD } from "../../constants";
import { useUser } from "reactfire";
import useWindhowWidth from "../../hooks/windowWidth";
import {
  deleteCardNotificationsOnCardClosure,
  deleteSpendByNotificationWhenBonusEarned,
} from "../../redux/actions/notificationsActions";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";
import { Errors } from "../common/input-fields/input-types";

type CardAddEditModalProps = {
  card?: Card;
  setModalOpen?: (isOpen: boolean) => void;
};
export default function CardAddEditModal({
  card,
  setModalOpen,
}: CardAddEditModalProps) {
  const [cardForModal, setCardForModal] = useState(card ?? NEW_CARD);

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const toggleShow = () => setShow(!show);
  const { isDesktop } = useWindhowWidth();
  const { data: user } = useUser();
  const notifications = useSelector(
    (state: MainReduxState) => state.notifications
  );
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);
  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value, checked } = event.target;

    if (value !== "" || value !== null) {
      delete errors[name];
    }

    if (name === "annualFee" && value === "0") {
      delete errors["nextFeeDate"];
    }

    if (name === "inquiries") {
      setCardForModal((prevCard) => ({
        ...prevCard,
        inquiries: { ...prevCard.inquiries, [value]: checked },
      }));
    } else if (name === "userId") {
      setCardForModal((prevCard) => ({
        ...prevCard,
        cardholder:
          cardholders.find((holder) => holder.id === value)?.name || "",
        userId: value,
      }));
    } else {
      setCardForModal((prevCard) => ({
        ...prevCard,
        [name]:
          name === "bonusEarned"
            ? checked
            : name === "issuer"
            ? ISSUERS.find((issuer) => issuer.name === value)
            : value,
      }));
    }
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    if (cardForModal.annualFee === "0" || cardForModal.annualFee === "") {
      cardForModal.nextFeeDate = "";
    }

    if (!cardForModal.spendReq || cardForModal.spendReq === "0") {
      cardForModal.spendBy = "";
    }

    const finalCard = { ...cardForModal };
    dispatch(saveCardToFirebase(finalCard, user?.uid));

    if (finalCard.status === "closed") {
      dispatch(
        deleteCardNotificationsOnCardClosure(
          notifications,
          finalCard.id,
          user?.uid
        )
      );
    }

    if (finalCard.status !== "closed" && finalCard.bonusEarned) {
      dispatch(
        deleteSpendByNotificationWhenBonusEarned(
          notifications,
          finalCard.id,
          user?.uid
        )
      );
    }

    toast.success(cardForModal.id === null ? "Card Created" : "Card Updated");
    toggleModal();
  }

  function clearCardState() {
    setCardForModal(NEW_CARD);
    toggleShow();
    setErrors({});
  }

  function formIsValid() {
    const {
      status,
      appDate,
      cardholder,
      issuer,
      card,
      cardType,
      creditLine,
      bonusEarned,
      bonusEarnDate,
      nextFeeDate,
      annualFee,
      inquiries,
    } = cardForModal;
    const errors: Errors = {};

    if (!status) errors.status = "Required";
    if (!appDate) errors.appDate = "Required";
    if (!cardholder) errors.userId = "Required";
    if (!issuer.name) errors.issuer = "Required";
    if (!card) errors.card = "Required";
    if (!cardType) errors.cardType = "Required";
    if (!creditLine) errors.creditLine = "Required";
    if (bonusEarned && !bonusEarnDate) errors.bonusEarnDate = "Required";
    if (Number(annualFee) > 0 && !nextFeeDate) errors.nextFeeDate = "Required";
    if (Object.values(inquiries).every((i) => i === null || i === false)) {
      errors.inquiries = "Required";
    }

    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  function handleEditButtonClick(e) {
    e.stopPropagation();
    toggleShow();
    if (setModalOpen) setModalOpen(true);
    else console.log("setModalOpen func is not passed for this component");
  }

  function toggleModal() {
    toggleShow();
    setErrors({});
    if (setModalOpen) setModalOpen(false);
    else console.log("setModalOpen func is not passed for this component");
  }

  return (
    <>
      {cardForModal.id !== "" ? (
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
        // backdrop="static"
        className="custom-modal"
      >
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{cardForModal.id ? "Edit" : "Add"} Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDesktop ? (
            <CardForm
              card={cardForModal}
              onSave={handleSaveForFirebase}
              onChange={handleChange}
              // toggle={toggle}
              errors={errors}
            />
          ) : (
            <CardFormResponsive
              card={cardForModal}
              onSave={handleSaveForFirebase}
              onChange={handleChange}
              errors={errors}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

CardAddEditModal.propTypes = {
  card: PropTypes.object,
  setModalOpen: PropTypes.func,
};
