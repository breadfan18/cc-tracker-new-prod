import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyTabs from "./LoyaltyTabs";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import { useUser } from "reactfire";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";

const LoyaltyPage = () => {
  const { status, data: user } = useUser();
  const dispatch = useDispatch();
  const loyaltyData = useSelector((state) => state.loyaltyData);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cardholders = useSelector((state) => state.cardholders);

  useEffect(() => {
    if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadloyaltyDataFromFirebase(user.uid));
    }

    if (cardholders.length === 0 && user) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
  }, [status, user, cardholders]);

  return (
    <div className="loyaltyContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Loyalty Accounts</h2>
        <LoyaltyAddEditModal cardholders={cardholders} />
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <LoyaltyTabs loyaltyData={loyaltyData} showEditDelete={true} />
      )}
    </div>
  );
};

export default LoyaltyPage;
