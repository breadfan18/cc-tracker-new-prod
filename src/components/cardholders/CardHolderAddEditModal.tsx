import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCardholderToFirebase } from "../../redux/actions/cardholderActions";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { saveLoyaltyDataToFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { useUser } from "reactfire";
import CardholderForm from "../loyalty/CardholderForm";
import { titleCase } from "../../helpers";
import _ from "lodash";
import { getFirebaseImgUrlForDataURL } from "../../tools/firebase";
import CardholderPhoto from "./CardholderPhoto";
import PhotoEditor from "./PhotoEditor";
import PhotoEditButton from "../common/PhotoEditButton";
import { MainReduxState } from "../../types/redux";
import { Errors } from "../../types/input-types";
import { Cardholder } from "../../types/cardholder-types";

const NEW_CARDHOLDER = {
  id: "",
  firstName: "",
  lastName: "",
  img: "",
};

type CardholderAddEditModalProps = {
  isNewCardholder: boolean;
  cardholder?: Cardholder;
  disableBtn?: boolean;
  showAsRectangle?: boolean;
};

type CardholderForModalType = {
  id: string;
  firstName: string;
  lastName: string;
  img: string;
  imgFile?: any;
};

function CardholderAddEditModal({
  isNewCardholder,
  cardholder,
  disableBtn,
  showAsRectangle,
}: CardholderAddEditModalProps) {
  const [cardHolderForModal, setCardHolderForModal] =
    useState<CardholderForModalType>(
      cardholder
        ? {
            id: cardholder.id,
            firstName: cardholder.name.split(" ")[0],
            lastName: cardholder.name.split(" ")[1],
            img: cardholder.img,
          }
        : NEW_CARDHOLDER
    );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
    if (cardHolderForModal.imgFile) delete cardHolderForModal.imgFile;
  };
  const [saving, setSaving] = useState(false);
  const { data: user } = useUser();
  const cards = useSelector((state: MainReduxState) =>
    _.groupBy(state.cards, (o) => o.userId)
  );
  const loyaltyData = useSelector((state: MainReduxState) =>
    _.groupBy(state.loyaltyData, (o) => o.userId)
  );
  const [imgEditor, setImgEditor] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setCardHolderForModal((prevValue) => ({
      ...prevValue,
      [name]: name === "imgFile" ? files[0] : value.trim(" "),
    }));
  };

  const handleSavePhoto = async (editor) => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const profilePhotoURL = canvas.toDataURL();
      return await getFirebaseImgUrlForDataURL(
        cardHolderForModal,
        profilePhotoURL
      );
    }
  };

  function formIsValid() {
    const { firstName, lastName } = cardHolderForModal;
    const errors: Errors = {};
    if (!firstName) errors.firstName = "Required";
    if (!lastName) errors.lastName = "Required";
    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  const handleSaveCardholder = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    const scaledImgUrl = await handleSavePhoto(imgEditor);

    const finalImg = scaledImgUrl || cardHolderForModal.img || "";

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
    delete cardHolderForModal.imgFile;
  };

  function clearCardholderState() {
    setCardHolderForModal(NEW_CARDHOLDER);
    toggleShow();
    setErrors({});
    delete cardHolderForModal.imgFile;
  }

  return (
    <>
      {isNewCardholder ? (
        <Button
          variant="primary"
          onClick={clearCardholderState}
          className="addButton"
        >
          Add Card Holder
        </Button>
      ) : (
        <Button
          variant="success"
          onClick={toggleShow}
          className={!showAsRectangle ? "rounded-circle" : ""}
          disabled={disableBtn}
        >
          <MdModeEditOutline />
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered size="sm">
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {isNewCardholder ? "Add" : "Edit"} Card Holder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              {cardHolderForModal.imgFile ? (
                <PhotoEditor
                  image={cardHolderForModal.imgFile || cardholder?.img}
                  setEditor={setImgEditor}
                />
              ) : (
                <CardholderPhoto
                  img={cardHolderForModal.img}
                  heightAndWidth="10rem"
                />
              )}
              {!cardHolderForModal.imgFile && (
                <PhotoEditButton onChange={handleChange} />
              )}
            </div>
            <CardholderForm
              cardholder={cardHolderForModal}
              onSave={handleSaveCardholder}
              onChange={handleChange}
              saving={saving}
              errors={errors}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardholderAddEditModal;
