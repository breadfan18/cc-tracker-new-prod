import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveLoyaltyDataToFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { LOYALTY_DATA_KEYS, PROGRAMS } from "../../constants";
import { maskPwd } from "../../helpers";
import LoyaltyForm from "./LoyaltyForm";
import { useUser } from "reactfire";
import { MainReduxState } from "../../types/redux";
import { LoyaltyData, LoyaltyProgram } from "../../types/loyalty-types";
import { Errors } from "../../types/input-types";

const newLoyaltyAcc = {
  id: "",
  loyaltyType: "",
  program: {
    id: "",
    type: "",
    name: "",
    img: "",
  },
  memberId: "",
  loginId: "",
  password: "",
  userId: "",
  accountHolder: "",
  rewardsBalance: "",
  rewardsExpiration: "",
};

type LoyaltyAddEditModalProps = {
  loyaltyAcc?: LoyaltyData;
  userAddedPrograms: LoyaltyProgram[];
};

function LoyaltyAddEditModal({
  loyaltyAcc,
  userAddedPrograms,
}: LoyaltyAddEditModalProps) {
  const dispatch = useDispatch();
  const [loyaltyAccForModal, setLoyaltyAccForModal] = useState<LoyaltyData>(
    loyaltyAcc ? { ...loyaltyAcc } : { ...newLoyaltyAcc }
  );
  const [show, setShow] = useState(false);
  const { data: user } = useUser();
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);
  const [errors, setErrors] = useState({});
  const toggleShow = useCallback(() => setShow((prev) => !prev), []);
  const combinedPrograms = useMemo(
    () => [...PROGRAMS, ...(userAddedPrograms || [])],
    [userAddedPrograms]
  );
  const [programsFilteredByType, setFilteredPrograms] = useState<
    LoyaltyProgram[]
  >([]);

  useEffect(() => {
    if (loyaltyAcc?.program.type) {
      setFilteredPrograms(
        combinedPrograms.filter(
          (program) => program.type === loyaltyAcc.program.type
        )
      );
    } else {
      setFilteredPrograms([]);
    }
  }, [combinedPrograms, loyaltyAcc]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          accountHolder:
            cardholders.find((holder) => holder.id === value)?.name || "",
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
    },
    [cardholders, combinedPrograms, errors]
  );

  const handleSave = useCallback(
    (event) => {
      function formIsValid() {
        const { userId, loyaltyType, program } = loyaltyAccForModal;
        const errors: Errors = {};
        if (!userId) errors.userId = "Required";
        if (!loyaltyType) errors.loyaltyType = "Required";
        if (!program.name) errors.program = "Required";
        setErrors(errors);
        // Form is valid if the errors objects has no properties
        return Object.keys(errors).length === 0;
      }

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
    },
    [dispatch, loyaltyAccForModal, toggleShow, user?.uid]
  );

  function clearLoyaltyAccState() {
    setLoyaltyAccForModal(newLoyaltyAcc);
    toggleShow();
    setErrors({});
    setFilteredPrograms([]);
  }

  return (
    <>
      {loyaltyAccForModal.id !== "" ? (
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

export default LoyaltyAddEditModal;
