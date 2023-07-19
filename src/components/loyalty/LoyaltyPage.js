import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyTabs from "./LoyaltyTabs";
import { addUserNameToCard } from "../../helpers";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";

const LoyaltyPage = ({ loyaltyData, loadloyaltyData, loading }) => {
  useEffect(() => {
    if (loyaltyData.length === 0) {
      loadloyaltyData();
    }
  }, []);
  return (
    <div className="loyaltyContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Loyalty Accounts</h2>
        <LoyaltyAddEditModal />
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
};

const mapStateToProps = (state) => ({
  loyaltyData: state.loyaltyData.map((l) => addUserNameToCard(l)),
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {
  loadloyaltyData: loadloyaltyDataFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyPage);
