import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCardFromFirebase } from "../../redux/actions/cardsActions";
import { deleteLoyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { deleteCardholderFromFirebase } from "../../redux/actions/cardholderActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "reactfire";
import { DELETE_MODAL_TYPES } from "../../constants";
import { deleteReferralFromFirebase } from "../../redux/actions/referralActions";
import {
  deleteLoyaltyNotificationOnLoyaltyClosure,
  deleteCardNotificationsOnCardClosure,
} from "../../redux/actions/notificationsActions";
import { MainReduxState } from "../../types/redux";
import { Card, Referral } from "../../types/cards-types";
import { LoyaltyData } from "../../types/loyalty-types";
import { Cardholder } from "../../types/cardholder-types";

type ConfirmDeleteModalProps = {
  data: Card | LoyaltyData | Cardholder | Referral;
  dataType: string;
  setModalOpen?: (modalOpen: boolean) => void;
  redirect?: boolean;
  disableBtn?: boolean;
  showAsRectangle?: boolean;
};

export default function ConfirmDeleteModal({
  data,
  dataType,
  setModalOpen,
  redirect,
  disableBtn = false,
  showAsRectangle,
}: ConfirmDeleteModalProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const { data: user } = useUser();
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: MainReduxState) => state.notifications
  );

  function setDataText() {
    switch (dataType) {
      case DELETE_MODAL_TYPES.card:
        return "card";
      case DELETE_MODAL_TYPES.loyaltyAcc:
        return "loyalty account";
      case DELETE_MODAL_TYPES.cardholder:
        return "card holder";
      case DELETE_MODAL_TYPES.referral:
        return "referral";
      default:
        break;
    }
  }

  function handleDelete(data) {
    console.log(data);

    switch (dataType) {
      case "card":
        dispatch(deleteCardFromFirebase(data, user?.uid));
        dispatch(
          deleteCardNotificationsOnCardClosure(
            notifications,
            data.id,
            user?.uid
          )
        );
        toast.success("Card deleted");
        if (redirect) history.push("/cards");
        break;
      case "loyaltyAcc":
        dispatch(deleteLoyaltyDataFromFirebase(data, user?.uid));
        dispatch(
          deleteLoyaltyNotificationOnLoyaltyClosure(
            notifications,
            data.id,
            user?.uid
          )
        );
        toast.success("Loyalty Account Deleted");
        break;
      case "cardholder":
        dispatch(deleteCardholderFromFirebase(data, user?.uid));
        toast.success("Card Holder Deleted");
        break;
      case "referral":
        dispatch(deleteReferralFromFirebase(data, user?.uid));
        toast.success("Referral Deleted");
        break;
      default:
        break;
    }

    toggleModal();
  }

  function handleDeleteButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    toggleShow();
    if (setModalOpen) setModalOpen(true);
    else console.log("setModalOpen func is not passed for this component");
  }

  function toggleModal() {
    toggleShow();
    if (setModalOpen) setModalOpen(false);
    else console.log("setModalOpen func is not passed for this component");
  }

  const dataText = setDataText();

  return (
    <>
      <DeleteButton
        onClick={handleDeleteButtonClick}
        disableBtn={disableBtn}
        showAsRectangle={showAsRectangle}
      />
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
