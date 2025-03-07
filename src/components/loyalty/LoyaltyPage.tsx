import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadloyaltyDataFromFirebase,
  loadUserLoyaltyProgramsFromFirebase,
} from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyTabs from "./LoyaltyTabs";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import { useUser } from "reactfire";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { PageNotifications } from "../common/Notifications/PageNotifications";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { APP_COLOR_BLUE } from "../../constants";
import { MainReduxState } from "../../types/redux";

const LoyaltyPage = () => {
  const { status, data: user } = useUser();
  const dispatch = useDispatch();
  const loyaltyData = useSelector((state: MainReduxState) => state.loyaltyData);
  const loading = useSelector(
    (state: MainReduxState) => state.apiCallsInProgress > 0
  );
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);
  const loyaltyNotifications = useSelector((state: MainReduxState) =>
    state.notifications.filter((n) => n.notificationType === "loyalty")
  );

  const userLoyaltyPrograms = useSelector(
    (state: MainReduxState) => state.userLoyaltyPrograms
  );

  useEffect(() => {
    if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadloyaltyDataFromFirebase(user.uid));
    }

    if (cardholders.length === 0 && user) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }

    if (userLoyaltyPrograms.length === 0 && user) {
      dispatch(loadUserLoyaltyProgramsFromFirebase(user?.uid));
    }
  }, [
    status,
    user,
    cardholders.length,
    loyaltyData.length,
    dispatch,
    userLoyaltyPrograms.length,
  ]);

  const cardNotificationElements = loyaltyNotifications.map(
    (notification, index) => {
      return (
        <PageNotifications
          notification={notification}
          Icon={PiAirplaneTiltFill}
          iconColor={APP_COLOR_BLUE}
          lastReminder={
            index === loyaltyNotifications.length - 1 ? true : false
          }
          firebaseUid={user?.uid}
        />
      );
    }
  );

  return (
    <div className="loyaltyContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Loyalty Accounts</h2>
        <LoyaltyAddEditModal userAddedPrograms={userLoyaltyPrograms} />
      </section>
      {loyaltyNotifications.length > 0 && (
        <section className="card-details-notifications-container">
          {cardNotificationElements}
        </section>
      )}
      {loading ? <Spinner /> : <LoyaltyTabs loyaltyData={loyaltyData} />}
    </div>
  );
};

export default LoyaltyPage;
