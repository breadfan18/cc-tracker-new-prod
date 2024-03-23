import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveReferralToFirebase } from "../../redux/actions/referralActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { useUser } from "reactfire";
import _ from "lodash";
import ReferralForm from "./ReferralForm";
import { ISSUERS, REFERRAL_DATA_KEYS } from "../../constants";

const NEW_REFERRAL = {
  id: null,
  referralFor: null,
  referralDate: null,
  issuer: {
    name: null,
    img: null,
  },
  referredCard: null,
  referralBonus: null,
  referralLink: null,
  referrerId: null,
  referringCardId: null,
  referralBonusEarned: null,
  referralEarnDate: null,
};
function ReferralAddEditModal({ referral }) {
  const [referralForModal, setReferralForModal] = useState(
    referral || NEW_REFERRAL
  );

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [saving, setSaving] = useState(false);
  const { data: user } = useUser();
  const cards = useSelector((state) => _.groupBy(state.cards, (o) => o.userId));
  const cardholders = useSelector((state) => state.cardholders);
  const [filteredCards, setFilteredCards] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (value !== "" || value !== null) {
      delete errors[name];
    }

    if (name === REFERRAL_DATA_KEYS.referrerId) {
      setFilteredCards(cards[value].filter((card) => card.status === "open"));
    }
    setReferralForModal((prevValue) => ({
      ...prevValue,
      [name]:
        name === REFERRAL_DATA_KEYS.referralBonusEarned
          ? checked
          : name === "issuer"
          ? ISSUERS.find((issuer) => issuer.name === value)
          : value,
    }));
  };

  function formIsValid() {
    const {
      referralFor,
      referralDate,
      referralBonus,
      referrerId,
      referringCardId,
      referralBonusEarned,
      referralEarnDate,
    } = referralForModal;
    const errors = {};
    if (!referralFor) errors.referralFor = "Required";
    if (!referralDate) errors.referralDate = "Required";
    if (!referrerId) errors.referrerId = "Required";
    if (!referringCardId) errors.referringCardId = "Required";
    if (!referralBonus) errors.referralBonus = "Required";
    if (referralBonusEarned && !referralEarnDate)
      errors.referralEarnDate = "Required";
    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  const handleSaveReferral = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    dispatch(saveReferralToFirebase(referralForModal, user?.uid));

    toast.success(
      referralForModal?.id === null ? "Referral Created" : "Referral Updated"
    );
    toggleShow();
    setSaving(false);
    delete referralForModal.imgFile;
  };

  function clearCardholderState() {
    setReferralForModal(NEW_REFERRAL);
    toggleShow();
    setErrors({});
    delete referralForModal.imgFile;
  }

  return (
    <>
      {referralForModal.id !== null ? (
        <Button
          variant="success"
          onClick={toggleShow}
          className="rounded-circle"
          // disabled={disableBtn}
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearCardholderState}
          className="addButton"
        >
          Add Referral
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {referralForModal.id ? "Edit" : "Add"} Referral
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ReferralForm
              referral={referralForModal}
              cardholders={cardholders}
              filteredCards={filteredCards}
              onSave={handleSaveReferral}
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

ReferralAddEditModal.propTypes = {
  referral: PropTypes.object,
  saveLoyaltyDataToFirebase: PropTypes.func,
};

export default ReferralAddEditModal;
