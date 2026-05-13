import { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { BsChevronDown } from "react-icons/bs";
import AddIssuerModal from "./AddIssuerModal";

type AddIssuerDropdownProps = {
  existingIssuerNames: string[];
};

export default function AddIssuerDropdown({
  existingIssuerNames,
}: AddIssuerDropdownProps) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle
          as={Button}
          id="add-issuer-dropdown"
          variant="link"
          className="p-0"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "1.1rem",
            lineHeight: 1,
          }}
          title="Add Issuer"
        >
          <BsChevronDown />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={toggleModal}>Add Issuer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <AddIssuerModal
        existingIssuerNames={existingIssuerNames}
        show={showModal}
        onHide={toggleModal}
      />
    </>
  );
}
