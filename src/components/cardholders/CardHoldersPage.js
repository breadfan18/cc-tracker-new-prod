import React, { useEffect } from "react";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { connect, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
const CardHoldersPage = ({ loadCardholdersFromFirebase }) => {
  const cardholders = useSelector((state) => state.cardholders);

  const elems = cardholders?.map((holder) => <p>{holder.name}</p>);

  useEffect(() => {
    if (cardholders.length === 0) {
      loadCardholdersFromFirebase("iXoAbxO0hMNBUUCzMnpnSydNKZg1");
    }
  }, [cardholders]);

  return (
    <div className="cardHoldersContainer">
      <h2 className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Manage Card Holders</h2>
        <CardHolderAddEditModal />
      </h2>
      {elems}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHoldersPage);
