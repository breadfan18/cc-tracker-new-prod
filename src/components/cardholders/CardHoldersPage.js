import React, { useEffect } from "react";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { connect, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";
import CardholdersList from "./CardholdersList";
import { Spinner } from "../common/Spinner";

const CardHoldersPage = ({ loadCardholdersFromFirebase }) => {
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) => state.cardholders);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  useEffect(() => {
    if (cardholders.length === 0 && status !== "loading") {
      loadCardholdersFromFirebase(user.uid);
    }
  }, [user]);

  return (
    <div className="cardHoldersContainer">
      <h2 className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Manage Card Holders</h2>
        <CardHolderAddEditModal />
      </h2>
      {loading ? <Spinner /> : <CardholdersList cardholders={cardholders} />}
    </div>
  );
};

const mapDispatchToProps = {
  loadCardholdersFromFirebase,
};

export default connect(null, mapDispatchToProps)(CardHoldersPage);
