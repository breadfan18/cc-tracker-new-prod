import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyTabs from "./LoyaltyTabs";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import { useUser } from "reactfire";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";

const LoyaltyPage = ({
  loyaltyData,
  loadloyaltyData,
  loading,
  cardholders,
  loadCardholdersFromFirebase,
}) => {
  const { status, data: user } = useUser();

  useEffect(() => {
    if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
      loadloyaltyData(user.uid);
    }

    if (cardholders.length === 0 && user) {
      loadCardholdersFromFirebase(user.uid);
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

LoyaltyPage.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  loadloyaltyData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cardholders: PropTypes.array.isRequired,
  loadCardholdersFromFirebase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loyaltyData: state.loyaltyData,
  loading: state.apiCallsInProgress > 0,
  cardholders: state.cardholders,
});

const mapDispatchToProps = {
  loadloyaltyData: loadloyaltyDataFromFirebase,
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyPage);
