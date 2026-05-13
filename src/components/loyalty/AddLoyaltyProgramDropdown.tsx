import { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { BsChevronDown } from "react-icons/bs";
import LoyaltyNewProgramForm from "./LoyaltyProgramForm";

export default function AddLoyaltyProgramDropdown() {
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [showNewLoyaltyProgramCreated, setNewLoyaltyProgramCreated] =
    useState(false);

  const toggleAddProgramModal = () => {
    if (!showAddProgramModal) {
      setNewLoyaltyProgramCreated(false);
    }
    setShowAddProgramModal((prev) => !prev);
  };

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle
          as={Button}
          id="add-loyalty-program-dropdown"
          variant="link"
          className="p-0"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "1.1rem",
            lineHeight: 1,
          }}
          title="Add Loyalty Program"
        >
          <BsChevronDown />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={toggleAddProgramModal}>
            Add Loyalty Program
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showAddProgramModal} onHide={toggleAddProgramModal} centered>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title>Add Loyalty Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body" style={{ padding: 30, borderRadius: 10 }}>
            <LoyaltyNewProgramForm
              showProgramCreated={showNewLoyaltyProgramCreated}
              setProgramCreated={setNewLoyaltyProgramCreated}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
