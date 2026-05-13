import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import CardForm from "./CardForm";
import CardFormResponsive from "./CardFormResponsive";
import AddIssuerDropdown from "./AddIssuerDropdown";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { CARD_DATA_KEYS, ISSUERS, NEW_CARD } from "../../constants";
import { useUser } from "reactfire";
import useWindhowWidth from "../../hooks/windowWidth";
import {
  deleteCardNotificationsOnCardClosure,
  deleteSpendByNotificationWhenBonusEarned,
} from "../../redux/actions/notificationsActions";
import { normalizeNumberInput } from "../../helpers";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";
import { Errors } from "../../types/input-types";

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
    (state: MainReduxState) => state.notifications,
  );
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);
  const userIssuers = useSelector((state: MainReduxState) => state.userIssuers);
  const dispatch = useDispatch();

  const allIssuers = useMemo(() => {
    const issuerMap = new Map<string, (typeof ISSUERS)[number]>();

    [...ISSUERS, ...userIssuers].forEach((issuer) => {
      issuerMap.set(issuer.name.trim().toLowerCase(), issuer);
    });

    return Array.from(issuerMap.values());
  }, [userIssuers]);

  const {
    creditLine,
    annualFee,
    spendReq,
    nextFeeDate,
    inquiries,
    bonusEarned,
    bonusEarnDate,
  } = CARD_DATA_KEYS;

  function handleChange(event) {
    const { name, value, checked } = event.target;

    // Normalize currency/number fields by removing commas
    const currencyFields = [creditLine, annualFee, spendReq];
    const normalizedValue = currencyFields.includes(name)
      ? normalizeNumberInput(value)
      : value;

    if (normalizedValue !== "" && normalizedValue !== null) {
      delete errors[name];
    }

    if (name === annualFee && normalizedValue === "0") {
      delete errors[nextFeeDate];
    }

    if (name === inquiries) {
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
        ...(name === bonusEarned
          ? {
              [bonusEarned]: checked,
              // Keep UI and persisted value in sync when bonus is toggled off.
              [bonusEarnDate]: checked ? prevCard[bonusEarnDate] : "",
            }
          : {
              [name]:
                name === "issuer"
                  ? allIssuers.find((issuer) => issuer.name === value)
                  : normalizedValue,
            }),
      }));
    }
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const finalCard = { ...cardForModal };

    if (finalCard.annualFee === "0" || finalCard.annualFee === "") {
      finalCard.nextFeeDate = "";
    }

    if (!finalCard.spendReq || finalCard.spendReq === "0") {
      finalCard.spendBy = "";
    }

    if (!finalCard.bonusEarned) {
      finalCard.bonusEarnDate = "";
    }

    dispatch(saveCardToFirebase(finalCard, user?.uid));

    if (finalCard.status === "closed") {
      dispatch(
        deleteCardNotificationsOnCardClosure(
          notifications,
          finalCard.id,
          user?.uid,
        ),
      );
    }

    if (finalCard.status !== "closed" && finalCard.bonusEarned) {
      dispatch(
        deleteSpendByNotificationWhenBonusEarned(
          notifications,
          finalCard.id,
          user?.uid,
        ),
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="primary"
            onClick={clearCardState}
            className="addButton"
          >
            Add Card
          </Button>
          <AddIssuerDropdown
            existingIssuerNames={allIssuers.map((issuer) => issuer.name)}
          />
        </div>
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
              issuers={allIssuers}
            />
          ) : (
            <CardFormResponsive
              card={cardForModal}
              onSave={handleSaveForFirebase}
              onChange={handleChange}
              errors={errors}
              issuers={allIssuers}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
