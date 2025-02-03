import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveLoyaltyDataToFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { LOYALTY_DATA_KEYS, PROGRAMS } from "../../constants";
import { maskPwd } from "../../helpers";
import LoyaltyForm from "./LoyaltyForm";
import { useUser } from "reactfire";

const newLoyaltyAcc = {
  id: null,
  loyaltyType: "",
  program: {
    id: null,
    type: null,
    name: null,
    img: null,
  },
  memberId: null,
  loginId: null,
  password: null,
  userId: null,
  accountHolder: null,
  rewardsBalance: null,
  rewardsExpiration: null,
};

function LoyaltyAddEditModal({ loyaltyAcc, userAddedPrograms }) {
  const dispatch = useDispatch();
  const [loyaltyAccForModal, setLoyaltyAccForModal] = useState(
    loyaltyAcc ? { ...loyaltyAcc } : newLoyaltyAcc
  );
  const [programsFilteredByType, setFilteredPrograms] = useState([]);
  const [show, setShow] = useState(false);
  const { data: user } = useUser();
  const cardholders = useSelector((state) => state.cardholders);
  const [errors, setErrors] = useState({});
  const combinedPrograms = [...PROGRAMS, ...(userAddedPrograms || [])];

  const toggleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== "" || value !== null) {
      delete errors[name];
    }

    if (name === LOYALTY_DATA_KEYS.loyaltyType) {
      const filteredPrograms = combinedPrograms.filter(
        (program) => program.type === value
      );
      setFilteredPrograms(filteredPrograms);
    } else if (name === "userId") {
      setLoyaltyAccForModal((prevAcc) => ({
        ...prevAcc,
        accountHolder: cardholders.find((holder) => holder.id === value).name,
        userId: value,
      }));
    }

    setLoyaltyAccForModal((prevValue) => ({
      ...prevValue,
      [name]:
        name === "id"
          ? parseInt(value, 10)
          : name === LOYALTY_DATA_KEYS.program
          ? combinedPrograms.find((program) => program.id === value)
          : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    const memberId = loyaltyAccForModal.memberId || "N/A";
    const loginId = loyaltyAccForModal.loginId || "N/A";
    const password = loyaltyAccForModal.password
      ? maskPwd(loyaltyAccForModal.password)
      : "N/A";

    const finalData = {
      ...loyaltyAccForModal,
      memberId,
      loginId,
      password,
    };

    dispatch(saveLoyaltyDataToFirebase(finalData, user?.uid));

    toast.success(
      loyaltyAccForModal?.id === null
        ? "Loyalty Account Created"
        : "Loyalty Account Updated"
    );
    toggleShow();
  };

  function formIsValid() {
    const { userId, loyaltyType, program } = loyaltyAccForModal;
    const errors = {};
    if (!userId) errors.userId = "Required";
    if (!loyaltyType) errors.loyaltyType = "Required";
    if (!program.name) errors.program = "Required";
    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  function clearLoyaltyAccState() {
    setLoyaltyAccForModal(newLoyaltyAcc);
    toggleShow();
    setErrors({});
    setFilteredPrograms([]);
  }

  return (
    <>
      {loyaltyAccForModal.id !== null ? (
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
          Add Account
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {loyaltyAccForModal.id ? "Edit" : "Add"} Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoyaltyForm
            loyaltyAcc={loyaltyAccForModal}
            onSave={handleSave}
            onChange={handleChange}
            filteredPrograms={programsFilteredByType}
            cardholders={cardholders}
            errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

LoyaltyAddEditModal.propTypes = {
  loyaltyAcc: PropTypes.object,
};

export default LoyaltyAddEditModal;
