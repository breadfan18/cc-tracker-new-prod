import { MainReduxState } from "../../types/redux";

const initialState: MainReduxState = {
  cards: [],
  loyaltyData: [],
  apiCallsInProgress: 0,
  cardholders: [],
  referrals: [],
  notifications: [],
  theme: "light",
  userLoyaltyPrograms: [],
};

export default initialState;
