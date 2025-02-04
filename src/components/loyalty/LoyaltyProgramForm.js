import React, { useState } from "react";
import TextInput from "../common/input-fields/TextInput";
import SelectInput from "../common/input-fields/SelectInput";
import {
  ACCOUNT_TYPE,
  AIRLINE_PROGRAMS_IMG,
  HOTELS_PROGRAMS_IMG,
  MISC_PROGRAMS_IMG,
  APP_COLOR_BLUE,
  DELETE_COLOR_RED,
} from "../../constants";
import { titleCase } from "../../helpers";
import { useDispatch } from "react-redux";
import { saveUserLoyaltyProgramToFirebase } from "../../redux/actions/loyaltyActions";
import { useUser } from "reactfire";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

const LoyaltyNewProgramForm = () => {
  const { data: user } = useUser();
  const initialNewProgramState = {
    type: "",
    name: "",
    img: "",
    url: "",
  };
  const dispatch = useDispatch();
  const [newProgram, setNewProgram] = useState(initialNewProgramState);
  const [errors, setErrors] = useState({});

  const handleSaveProgram = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;

    const imgToAdd =
      newProgram.type === "airlines"
        ? AIRLINE_PROGRAMS_IMG
        : newProgram.type === "hotels"
        ? HOTELS_PROGRAMS_IMG
        : MISC_PROGRAMS_IMG;
    dispatch(
      saveUserLoyaltyProgramToFirebase(
        { ...newProgram, img: imgToAdd },
        user?.uid
      )
    );
    setNewProgram(initialNewProgramState);
    toast.success("New Loyalty Program Created");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function formIsValid() {
    const { type, name, url } = newProgram;
    const errors = {};
    if (!type) errors.type = "Required";
    if (!name) errors.name = "Required";
    if (url && !/^(ftp|http|https):\/\/[^ "]+$/.test(url))
      errors.url = "Invalid URL format";
    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSaveProgram} className="singleColumnForm">
        <h4 style={{ color: APP_COLOR_BLUE }}>Add a Loyalty Program</h4>
        {!isEmpty(errors) && (
          <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
            {(errors.name || errors.type) && (
              <p>Please enter requried fields</p>
            )}
            {errors.url && <p>Please enter a valid url</p>}
          </div>
        )}

        <SelectInput
          name="type"
          label="Program Type"
          value={newProgram.type || ""}
          defaultOption="Select Account Type"
          options={ACCOUNT_TYPE.map((type) => ({
            value: type,
            text: titleCase(type),
          }))}
          onChange={handleChange}
          requiredField
          error={errors.type}
        />
        <TextInput
          name="name"
          label="Program Name"
          value={titleCase(newProgram.name)}
          onChange={handleChange}
          requiredField
          error={errors.name}
        />
        <TextInput
          name="url"
          label="Program URL"
          value={newProgram.url}
          onChange={handleChange}
          error={errors.url}
          onB
        />
        <hr />
        <button
          type="submit"
          // disabled={saving}
          className="btn btn-primary addButton"
        >
          Add Program
        </button>
      </form>
    </>
  );
};

export default LoyaltyNewProgramForm;

/*
TO DO:
- Toast message for successful save
- Show user added programs in the new programs tab? 
- Allow edit and/or delete functionality? If a program is being used, dont allow deletion? 
- Redirect to the first tab after save?
*/
