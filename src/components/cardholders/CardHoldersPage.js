import React, { useEffect, useState } from "react";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { connect, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";
import { foo } from "../../tools/firebase";
import { Button, Form } from "react-bootstrap";
import SelectInput from "../common/SelectInput";
import TextInput from "../common/TextInput";

const CardHoldersPage = ({ loadCardholdersFromFirebase }) => {
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) => state.cardholders);

  const handleChange = (e) => {
    console.log("fdoo");
  };

  useEffect(() => {
    if (cardholders.length === 0 && status !== "loading") {
      loadCardholdersFromFirebase(user.uid);
    }
  }, [user]);

  const elems = cardholders?.map((holder) => <p>{holder.name}</p>);

  return (
    <div className="cardHoldersContainer">
      <h2 className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Manage Card Holders</h2>
      </h2>
      {elems}
      <TextInput
        name="Test"
        label="Card Holder Name"
        value={""}
        onChange={handleChange}
        // error={errors.title}
      />
      <Button className="addButton" onClick={() => {}}>
        Add
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHoldersPage);
