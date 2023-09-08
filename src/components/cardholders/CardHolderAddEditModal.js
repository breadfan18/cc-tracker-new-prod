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
import { ref } from "firebase/storage";
import { storage } from "../../tools/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";

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
  const { data: user } = useUser();
  const cards = useSelector((state) => _.groupBy(state.cards, (o) => o.userId));
  const loyaltyData = useSelector((state) =>
    _.groupBy(state.loyaltyData, (o) => o.userId)
  );

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setCardHolderForModal((prevValue) => ({
      ...prevValue,
      [name]: name === "imgUpload" ? files[0] : value.trim(" "),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const imgRef = ref(storage, `images/${cardHolderForModal.imgUpload.name}`);
    uploadBytes(imgRef, cardHolderForModal.imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // Working on this upload.. need to then dispatch the saveCardholder thunk in here..
        console.log(url);
      });
    });

    const finalCardholder = {
      name:
        titleCase(cardHolderForModal.firstName) +
        " " +
        titleCase(cardHolderForModal.lastName),
      id: cardHolderForModal.id,
      img: cardHolderForModal.img || "",
    };

    dispatch(saveCardholderToFirebase(finalCardholder, user?.uid));

    if (cardHolderForModal?.id !== null) {
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

export default CardholderAddEditModal;
