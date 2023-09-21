import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCardholderToFirebase } from "../../redux/actions/cardholderActions";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { saveLoyaltyDataToFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { useUser } from "reactfire";
import CardholderForm from "../loyalty/CardholderForm";
import { titleCase } from "../../helpers";
import _ from "lodash";
import { getFirebaseImgUrl } from "../../tools/firebase";
import CardholderPhoto from "./CardholderPhoto";

const newCardholder = {
  id: null,
  firstName: "",
  lastName: "",
  img: null,
};
function CardholderAddEditModal({ cardholder, disableBtn }) {
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
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [saving, setSaving] = useState(false);
  const { data: user } = useUser();
  const cards = useSelector((state) => _.groupBy(state.cards, (o) => o.userId));
  const loyaltyData = useSelector((state) =>
    _.groupBy(state.loyaltyData, (o) => o.userId)
  );

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setCardHolderForModal((prevValue) => ({
      ...prevValue,
      [name]: name === "imgFile" ? files[0] : value.trim(" "),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const finalImg = cardHolderForModal.imgFile
      ? await getFirebaseImgUrl(cardHolderForModal)
      : cardHolderForModal.img
      ? cardHolderForModal.img
      : "";

    const finalCardholder = {
      name:
        titleCase(cardHolderForModal.firstName) +
        " " +
        titleCase(cardHolderForModal.lastName),
      id: cardHolderForModal.id,
      img: finalImg,
    };

    dispatch(saveCardholderToFirebase(finalCardholder, user?.uid));

    const shouldUpdateCardsAndLoyalty =
      (cardHolderForModal?.id !== null &&
        cardholder?.name?.split(" ")[0] !== cardHolderForModal.firstName) ||
      cardholder?.name?.split(" ")[1] !== cardHolderForModal.lastName;

    if (shouldUpdateCardsAndLoyalty) {
      const cardsForThisHolder = cards[cardHolderForModal.id];
      const loyaltyForThisHolder = loyaltyData[cardHolderForModal.id];

      if (cardsForThisHolder) {
        cardsForThisHolder.forEach((card) => {
          const updatedCard = {
            ...card,
            cardholder: finalCardholder.name,
          };
          dispatch(saveCardToFirebase(updatedCard, user?.uid));
        });
      }

      if (loyaltyForThisHolder) {
        loyaltyForThisHolder.forEach((acc) => {
          const updatedAcc = {
            ...acc,
            accountHolder: finalCardholder.name,
          };
          dispatch(saveLoyaltyDataToFirebase(updatedAcc, user?.uid));
        });
      }
    }

    toast.success(
      cardHolderForModal?.id === null
        ? "Card Holder Created"
        : "Card Holder Updated"
    );
    toggleShow();
    setSaving(false);
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

      <Modal show={show} onHide={toggleShow} centered size="sm">
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {cardHolderForModal.id ? "Edit" : "Add"} Card Holder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardholderPhoto
                img={cardHolderForModal.img}
                heightAndWidth="10rem"
                editMode
              />
            </div>
            <CardholderForm
              cardholder={cardHolderForModal}
              onSave={handleSave}
              onChange={handleChange}
              saving={saving}
              // errors={errors}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

CardholderAddEditModal.propTypes = {
  cardholder: PropTypes.object,
  saveLoyaltyDataToFirebase: PropTypes.func,
};

export default CardholderAddEditModal;
