import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "../common/input-fields/TextInput";
import { useUser } from "reactfire";
import { saveUserIssuerToFirebase } from "../../redux/actions/issuerActions";
import { DELETE_COLOR_RED } from "../../constants";
import { MainReduxState } from "../../types/redux";
import { Errors } from "../../types/input-types";

type AddIssuerModalProps = {
  existingIssuerNames: string[];
  show?: boolean;
  onHide?: () => void;
};

const newIssuer = {
  name: "",
  img: "",
};

export default function AddIssuerModal({
  existingIssuerNames,
  show: controlledShow,
  onHide: controlledOnHide,
}: AddIssuerModalProps) {
  const [internalShow, setInternalShow] = useState(false);
  const [issuer, setIssuer] = useState(newIssuer);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();
  const { data: user } = useUser();
  const loading = useSelector((state: MainReduxState) =>
    Boolean(state.loading?.userIssuers),
  );

  // Use controlled props if provided, otherwise use internal state
  const show = controlledShow !== undefined ? controlledShow : internalShow;
  const toggleShow = () => {
    if (controlledOnHide) {
      controlledOnHide();
    } else {
      setInternalShow((prev) => !prev);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIssuer((prev) => ({ ...prev, [name]: value }));

    if (value !== "" && value !== null) {
      delete errors[name];
      setErrors({ ...errors });
    }
  };

  const formIsValid = () => {
    const newErrors: Errors = {};
    const normalizedName = issuer.name.trim().toLowerCase();

    if (!issuer.name.trim()) newErrors.name = "Required";
    if (
      issuer.img.trim() &&
      !/^(ftp|http|https):\/\/[^ "']+$/.test(issuer.img.trim())
    ) {
      newErrors.img = "Invalid URL format";
    }

    if (
      existingIssuerNames.some((name) => name.toLowerCase() === normalizedName)
    ) {
      newErrors.name = "Issuer already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.uid) return;
    if (!formIsValid()) return;

    dispatch(
      saveUserIssuerToFirebase(
        {
          name: issuer.name.trim(),
          img: issuer.img.trim(),
        },
        user.uid,
      ),
    );

    setIssuer(newIssuer);
    setErrors({});
    toggleShow();
  };

  const handleClose = () => {
    setIssuer(newIssuer);
    setErrors({});
    toggleShow();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Add Issuer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSave} className="singleColumnForm">
          {(errors.name || errors.img) && (
            <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
              {errors.name && <p>{errors.name}</p>}
              {errors.img && <p>{errors.img}</p>}
            </div>
          )}

          <TextInput
            name="name"
            label="Issuer Name"
            value={issuer.name}
            onChange={handleChange}
            requiredField
            error={errors.name}
          />
          <TextInput
            name="img"
            label="Issuer Logo URL (Optional)"
            value={issuer.img}
            onChange={handleChange}
            error={errors.img}
          />

          <hr />
          <div className="d-flex gap-2">
            <Button type="submit" className="addButton" disabled={loading}>
              Save Issuer
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
